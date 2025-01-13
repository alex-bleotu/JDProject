import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { Award, Droplets, Leaf, Scale, TreePine } from "lucide-react";
import { Doughnut } from "react-chartjs-2";
import { useRecycling } from "../contexts/RecycleContext";
import { useAuth } from "../hooks/useAuth";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const IMPACT_FACTORS = {
    plastic: {
        co2PerKg: 6,
        waterPerKg: 17,
        treesPerTon: 17,
    },
    metal: {
        co2PerKg: 13.7,
        waterPerKg: 15,
        treesPerTon: 20,
    },
    glass: {
        co2PerKg: 0.3,
        waterPerKg: 2,
        treesPerTon: 1.2,
    },
};

export function Analytics() {
    const { session, loading } = useAuth();
    const { recyclingData } = useRecycling();

    const plasticKg = recyclingData?.plasticCount || 0;
    const metalKg = recyclingData?.metalCount || 0;
    const glassKg = recyclingData?.glassCount || 0;

    const totalKg = Math.floor(plasticKg + metalKg + glassKg);

    const calculateImpact = () => {
        const co2Saved =
            plasticKg * IMPACT_FACTORS.plastic.co2PerKg +
            metalKg * IMPACT_FACTORS.metal.co2PerKg +
            glassKg * IMPACT_FACTORS.glass.co2PerKg;

        const waterSaved =
            plasticKg * IMPACT_FACTORS.plastic.waterPerKg +
            metalKg * IMPACT_FACTORS.metal.waterPerKg +
            glassKg * IMPACT_FACTORS.glass.waterPerKg;

        const treesSaved =
            (plasticKg / 1000) * IMPACT_FACTORS.plastic.treesPerTon +
            (metalKg / 1000) * IMPACT_FACTORS.metal.treesPerTon +
            (glassKg / 1000) * IMPACT_FACTORS.glass.treesPerTon;

        return {
            co2: Math.round(co2Saved * 10) / 10,
            water: Math.round(waterSaved),
            trees: Math.round(treesSaved * 10) / 10,
        };
    };

    const impact = calculateImpact();

    const materialData = {
        labels: ["Plastic", "Metal", "Glass"],
        datasets: [
            {
                data: [plasticKg, metalKg, glassKg],
                backgroundColor: [
                    "rgba(34, 197, 94, 0.8)",
                    "rgba(59, 130, 246, 0.8)",
                    "rgba(168, 85, 247, 0.8)",
                ],
                borderWidth: 0,
            },
        ],
    };

    const impactStats = [
        {
            icon: Scale,
            label: "Total KG Recycled",
            value: totalKg.toLocaleString(),
            unit: "items",
        },
        {
            icon: Leaf,
            label: "CO2 Emissions Saved",
            value: impact.co2.toLocaleString(),
            unit: "kg",
        },
        {
            icon: TreePine,
            label: "Trees Equivalent",
            value: impact.trees.toLocaleString(),
            unit: "trees",
        },
        {
            icon: Droplets,
            label: "Water Saved",
            value: impact.water.toLocaleString(),
            unit: "L",
        },
    ];

    // Show loading state while session is being checked
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-secondary-600 dark:text-secondary-400">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    // Only check session after loading is complete
    if (!loading && !session) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <Award className="mx-auto h-12 w-12 text-primary-600 dark:text-primary-400" />
                    <h2 className="mt-2 text-3xl font-bold text-secondary-800 dark:text-secondary-200">
                        Connect Your Wallet
                    </h2>
                    <p className="mt-2 text-secondary-600 dark:text-secondary-400">
                        Connect your wallet to view your recycling analytics
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-secondary-800 dark:text-secondary-200">
                    Recycling Analytics
                </h1>
                <p className="mt-2 text-secondary-600 dark:text-secondary-400">
                    Track your environmental impact and recycling progress
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {impactStats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                                <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            </div>
                            <h3 className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                                {stat.label}
                            </h3>
                        </div>
                        <div className="flex items-baseline">
                            <p className="text-2xl font-semibold text-secondary-800 dark:text-secondary-200">
                                {stat.value}
                            </p>
                            <p className="ml-2 text-sm text-secondary-600 dark:text-secondary-400">
                                {stat.unit}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700">
                    <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200 mb-6 flex items-center">
                        <Scale className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                        Materials Recycled
                    </h3>
                    <div className="h-64">
                        <Doughnut
                            data={materialData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: "bottom",
                                        labels: {
                                            color: "#64748b",
                                        },
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const value =
                                                    context.raw as number;
                                                return `${value.toFixed(2)} kg`;
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700">
                    <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200 mb-4 flex items-center">
                        <Leaf className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                        Environmental Impact Breakdown
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-secondary-50 dark:bg-secondary-900 rounded-lg">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-secondary-600 dark:text-secondary-400">
                                    Plastic
                                </span>
                                <span className="text-sm font-medium text-secondary-800 dark:text-secondary-200">
                                    {plasticKg.toFixed(2)} kg
                                </span>
                            </div>
                            <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{
                                        width: `${
                                            (plasticKg /
                                                (plasticKg +
                                                    metalKg +
                                                    glassKg)) *
                                            100
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-secondary-50 dark:bg-secondary-900 rounded-lg">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-secondary-600 dark:text-secondary-400">
                                    Metal
                                </span>
                                <span className="text-sm font-medium text-secondary-800 dark:text-secondary-200">
                                    {metalKg.toFixed(2)} kg
                                </span>
                            </div>
                            <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{
                                        width: `${
                                            (metalKg /
                                                (plasticKg +
                                                    metalKg +
                                                    glassKg)) *
                                            100
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-secondary-50 dark:bg-secondary-900 rounded-lg">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-secondary-600 dark:text-secondary-400">
                                    Glass
                                </span>
                                <span className="text-sm font-medium text-secondary-800 dark:text-secondary-200">
                                    {glassKg.toFixed(2)} kg
                                </span>
                            </div>
                            <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                                <div
                                    className="bg-purple-500 h-2 rounded-full"
                                    style={{
                                        width: `${
                                            (glassKg /
                                                (plasticKg +
                                                    metalKg +
                                                    glassKg)) *
                                            100
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
