import { motion } from 'framer-motion';

const StatsSection = ({ stats }: { stats: any }) => {
    const statVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr,auto,auto,auto,1fr] gap-32 text-center">
                <div></div>

                {stats.map((stat: any) => (
                    <motion.div
                        key={stat.label}
                        variants={statVariant}
                        initial="hidden"
                        whileInView="visible"
                        className="p-6"
                    >
                        <h3 className="text-4xl font-bold">{stat.value}</h3>
                        <p className="text-lg mt-2">{stat.label}</p>
                    </motion.div>
                ))}

                <div></div>
            </div>
        </div>
    );
};

export default StatsSection;
