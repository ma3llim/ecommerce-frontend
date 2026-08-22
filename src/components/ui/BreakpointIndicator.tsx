const BreakpointIndicator = () => {
    return (
        <div className="fixed bottom-4 right-0 z-50 -translate-x-1/2">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg">
                <span className="sm:hidden">XS</span>
                <span className="hidden sm:block md:hidden">SM</span>
                <span className="hidden md:block lg:hidden">MD</span>
                <span className="hidden lg:block xl:hidden">LG</span>
                <span className="hidden xl:block 2xl:hidden">XL</span>
                <span className="hidden 2xl:block">2XL</span>
            </div>
        </div>
    );
};

export default BreakpointIndicator;
