const carbonCard = (percent) => `
    <svg width="300" height="110" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="110" style="fill:rgb(255,2505,255);stroke-width:3;stroke:rgb(0,0,0)" />
        <text font-size="20" font-family="Arial, Helvetica, sans-serif"> 
            <tspan x="3em" y="1.5em">This project is</tspan>
            <tspan x="50%" y="61%" text-anchor="middle" font-size="35" fill="green">${percent}%</tspan>
            <tspan x="3em" y="4.7em">cleaner than average</tspan>
        </text>    
    </svg>`

module.exports = (req, res) => {
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(carbonCard(req.query.p))
}