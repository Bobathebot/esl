exports.login = (req, res) => {
  const { email, password } = req.body;
  const teacherEmail = "lilac@esl.com";
  const teacherPassword = "123";

  if (email === teacherEmail && password === teacherPassword) {
    return res.json({ success: true, role: "teacher" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials." });
  }
};
