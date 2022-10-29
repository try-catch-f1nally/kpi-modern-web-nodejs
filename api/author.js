export default function handler(req, res) {
  const message = 'Mykyta Kulbanevych';
  res.status(200).json({message});
}
