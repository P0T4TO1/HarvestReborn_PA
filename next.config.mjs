/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'i.ibb.co'],
    },
    basePath: '/harvestr-nextjs',
    output: 'export',
};

export default nextConfig;
