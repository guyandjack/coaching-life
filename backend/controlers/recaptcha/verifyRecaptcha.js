// eslint-disable-next-line no-undef
require("dotenv").config();
async function verifyRecaptcha(req, res) {
  const { token } = req.body;
  console.log("token du body: " + token);
  // eslint-disable-next-line no-undef
  let secretKey = process.env.SK_RECAPTCHA;

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // eslint-disable-next-line no-undef
      //body: `${process.env.SK_RECAPTCHA}&response=${token}`,
      body: `secret=${secretKey}&response=${token}`,
    }
  );

  const data = await response.json();

  if (data.success) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
}

// eslint-disable-next-line no-undef
module.exports = verifyRecaptcha;
