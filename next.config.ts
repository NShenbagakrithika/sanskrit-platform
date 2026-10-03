import type { NextConfig } from "next";
const production=process.env.NODE_ENV==="production";
const nextConfig:NextConfig={
 async headers(){return [{source:"/:path*",headers:[
 {key:"X-Content-Type-Options",value:"nosniff"},
 {key:"Referrer-Policy",value:"same-origin"},
 {key:"Permissions-Policy",value:"camera=(), geolocation=(), microphone=(self)"},
 ...(production?[{key:"Content-Security-Policy",value:"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; media-src 'self' blob: data:; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'"}]:[])
 ]}];}
};
export default nextConfig;
