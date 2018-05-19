module.exports = (client) => [
	{
		name:'User',
		level:0,
		check: () => true,
	},
	{
		name: 'Administrator',
		level:1,
		check: function(message) {
			try {
				let adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole);
				if(!adminRole) adminRole = message.guild.roles.find(r => r.name.toLowerCase() === 'moderator' || r.name.toLowerCase() === 'admin');
				if(message.author.roles.has(adminRole.id) && adminRole) return true;
			}
			catch(e) {
				return false;
			}
		},
	},
	{
		name:'Server Owner',
		level:2,
		check: function(message) {
			try {
				if(message.author.id === message.guild.owner.id)return true;
			}
			catch(e) {
				return false;
			}
		},
	},
	{
		name:'Bot Support',
		level:3,
		check: (message) => {
			try {
				if(client.config.support.includes(message.author.id)) return true;
				else return false;
			}
			catch(e) {
				return false;
			}
		},
	},
	{
		name:'Bot Admin',
		level:4,
		check: function(message) {
			try {
				if(client.config.admins.includes(message.author.id)) return true;
				else return false;
			}
			catch(e) {
				return false;
			}
		},
	},
	{
		name:'Contributors',
		level:5,
		check: (message) => {
			try {
				if(client.config.contributors.includes(message.author.id)) return true;
				else return false;
			}
			catch(e) {return false;}
		},
	},
	{
		name:'Bot Owner',
		level:6,
		check: function(message) {
			try {
				if (message.author.id === '206102420177027072') return true;
				else return false;
			}
			catch(e) {
				return false;
			}
		},
	},
];