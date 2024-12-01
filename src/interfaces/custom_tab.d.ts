interface TabData {
    title: string;
    value: string;
    components: React.ReactNode;
}

interface CustomTabProps {
    tabsData: TabData[];
    selectedTab: string;
    setSelectedTab: (value: string) => void;
}
