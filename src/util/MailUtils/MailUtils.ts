import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dolphin.m3mo@gmail.com",
    pass: "msfrsyisohmxwcjf",
  },
});

export const mailOptions = (receivers: string, gameId: string) => {
  return {
    from: "dolphin.m3mo@gmail.com",
    to: receivers,
    subject: "Join Dolphin M3mo game",
    text: `Go to https://dolphin-demo.netlify.app/games/${gameId} to join the game.`,
  };
};
