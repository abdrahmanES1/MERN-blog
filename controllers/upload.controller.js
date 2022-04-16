function postFile(req, res) {
   if (req.file) {
      let imageUrl = req?.file?.path.split("/");
      imageUrl.shift();
      imageUrl = imageUrl.join("/");
      res.send({ success: true, imageUrl });
   } else {
      res.status(403).send({ success: false, error: "Unexpected Error" });
   }
}
module.exports = {
   postFile,
};
