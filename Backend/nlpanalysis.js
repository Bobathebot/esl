// nlpanalysis.js
require('dotenv').config();
const axios = require('axios');
const qs = require('qs');

async function grammarCorrect(text) {
  const url = "https://api-inference.huggingface.co/models/pszemraj/flan-t5-large-grammar-synthesis";
  const headers = {
    'Authorization': `Bearer ${process.env.HF_TOKEN}`,
    'Content-Type': 'application/json'
  };
  const data = { inputs: text };

  try {
    const response = await axios.post(url, data, { headers });
    if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].generated_text) {
      return response.data[0].generated_text.trim();
    } else {
      console.error("Unexpected HF API response:", response.data);
      return text;
    }
  } catch (error) {
    console.error("Error calling HF API:", error.response ? error.response.data : error);
    return text;
  }
}

async function highlightErrorsWithLanguageTool(text) {
  try {
    const resp = await axios.post("https://api.languagetool.org/v2/check", qs.stringify({
      text: text,
      language: 'en-US'
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const data = resp.data;
    const matches = data.matches || [];
    const sortedMatches = matches.sort((a, b) => b.offset - a.offset);

    let highlighted = text;
    for (const m of sortedMatches) {
      const start = m.offset;
      const length = m.length;
      const original = highlighted.substring(start, start+length);
      const replacement = `<span class="bg-red-200 px-1 rounded font-semibold text-red-800">${original}</span>`;
      highlighted = highlighted.slice(0, start) + replacement + highlighted.slice(start+length);
    }

    return { highlighted, matches };
  } catch (error) {
    console.error("Error calling LanguageTool:", error.response ? error.response.data : error);
    return { highlighted: text, matches: [] };
  }
}

async function performNlpAnalysis(text) {
  console.log("NLP Analysis Input:", text);
  const correctedText = await grammarCorrect(text);
  console.log("Corrected text:", correctedText);

  const { highlighted, matches } = await highlightErrorsWithLanguageTool(text);

  let score = 100 - (matches.length * 5);
  if (score < 0) score = 0;

  let grade;
  if (score >= 80) grade = "Gold";
  else if (score >= 50) grade = "Silver";
  else grade = "Bronze";

  const feedback = matches.length === 0 
    ? "Excellent grammar and spelling."
    : "Some grammar/spelling issues found.";

  console.log("NLP Analysis Output:", { score, grade, highlightedAnswer: highlighted });
  return {
    score,
    feedback,
    highlightedAnswer: highlighted,
    grade
  };
}

module.exports = { performNlpAnalysis };
