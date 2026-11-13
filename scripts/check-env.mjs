const required=['MONGODB_URI','JWT_SECRET','CLIENT_URL'];
const missing=required.filter(k=>!process.env[k]);
if(missing.length){console.error('Missing environment variables:',missing.join(', '));process.exit(1)}
console.log('Required environment variables are present.');
