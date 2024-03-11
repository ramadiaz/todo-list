/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com"
            },
        ]
    }
};

export default nextConfig;
