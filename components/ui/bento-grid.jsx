"use client";

import { cn } from "@/lib/utils";

function BentoGrid({ items, className }) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-6 rounded-xl overflow-hidden transition-all duration-300",
                        "border border-purple-100/60 dark:border-purple-500/20 bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm",
                        "hover:shadow-[0_4px_15px_rgba(147,51,234,0.08)] dark:hover:shadow-[0_4px_15px_rgba(147,51,234,0.15)]",
                        "hover:-translate-y-1 will-change-transform",
                        item.colSpan || "col-span-1",
                        item.colSpan === 2 ? "md:col-span-2" : "",
                        {
                            "shadow-[0_4px_15px_rgba(147,51,234,0.08)] -translate-y-1":
                                item.hasPersistentHover,
                            "dark:shadow-[0_4px_15px_rgba(147,51,234,0.15)]":
                                item.hasPersistentHover,
                        }
                    )}
                >
                    <div
                        className={`absolute inset-0 ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-300`}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.04)_1px,transparent_1px)] bg-[length:8px_8px]" />
                    </div>

                    <div className="relative flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-100 to-gray-300 dark:from-purple-900/30 dark:to-gray-700/30 group-hover:from-purple-200 group-hover:to-gray-400 dark:group-hover:from-purple-800/40 dark:group-hover:to-gray-600/40 transition-all duration-300">
                                {item.icon}
                            </div>
                            {item.status && (
                                <span
                                    className={cn(
                                        "text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm",
                                        "bg-gradient-to-r from-purple-100 to-gray-300 dark:from-purple-900/40 dark:to-gray-700/40",
                                        "text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-500/30",
                                        "transition-all duration-300 group-hover:from-purple-200 group-hover:to-gray-400 dark:group-hover:from-purple-800/50 dark:group-hover:to-gray-600/50"
                                    )}
                                >
                                    {item.status}
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 tracking-tight text-lg">
                                {item.title}
                                {item.meta && (
                                    <span className="ml-2 text-sm text-purple-600 dark:text-purple-400 font-normal">
                                        {item.meta}
                                    </span>
                                )}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                                {item.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-xs px-2 py-1 rounded-md bg-gradient-to-r from-purple-50 to-gray-200 dark:from-purple-900/20 dark:to-gray-800/20 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-500/20 transition-all duration-200 hover:from-purple-100 hover:to-gray-300 dark:hover:from-purple-800/30 dark:hover:to-gray-700/30"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            {item.cta && (
                                <span className="text-xs text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                                    {item.cta}
                                </span>
                            )}
                        </div>
                    </div>

                    <div
                        className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-purple-200/20 via-gray-300/20 to-purple-200/20 dark:from-purple-500/20 dark:via-gray-600/20 dark:to-purple-500/20 ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-300`}
                    />
                </div>
            ))}
        </div>
    );
}

export { BentoGrid } 