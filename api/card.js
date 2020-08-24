const carbonPercentCard = (percent) => `
    <svg width="300" height="110" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="110" style="fill:rgb(255,2505,255);stroke-width:3;stroke:rgb(0,0,0)" />
        <text font-size="20" font-family="Arial, Helvetica, sans-serif">
            <tspan x="3em" y="1.5em">This project is</tspan>
            <tspan x="50%" y="61%" text-anchor="middle" font-size="35" fill="green">${percent}%</tspan>
            <tspan x="3em" y="4.7em">cleaner than average</tspan>
        </text>
    </svg>`;
const carbonGramCard = (grams) => {
  const unit = "g";
  const value = grams;
  return `
        <svg width="300" height="110" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="110" style="fill:rgb(255,2505,255);stroke-width:3;stroke:rgb(0,0,0)" />
            <text font-size="20" font-family="Arial, Helvetica, sans-serif">
                <tspan x="3em" y="1.5em">This project generates</tspan>
                <tspan x="50%" y="61%" text-anchor="middle" font-size="35" fill="green">${value}${unit}</tspan>
                <tspan x="3em" y="4.7em">of carbon on every visit</tspan>
            </text>
        </svg>
    `;
};
module.exports = (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  if (req.query.type === "grams") {
    res.send(carbonGramCard(req.query.p));
  } else if (req.query.type === "percent") {
    res.send(carbonPercentCard(req.query.p));
  } else {
    res.send(carbonPercentCard(req.query.p));
  }
};
