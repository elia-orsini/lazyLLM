import { withSessionRoute } from "@utils/session";

export default withSessionRoute(async (req, res) => {
  req.session.destroy();
  res.json({ isLoggedIn: false });
});
