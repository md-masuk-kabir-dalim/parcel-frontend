import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FC } from 'react';

const CustomTab: FC<CustomTabProps> = ({ tabsData, selectedTab, setSelectedTab }) => {
    return (
        <Tabs value={selectedTab}>
            <TabsList className='flex gap-2 w-full items-center'>
                {tabsData?.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        onClick={() => setSelectedTab(tab.value)}
                        className={`relative w-full border border-primary rounded-none ${
                            selectedTab === tab.value
                                ? 'bg-primary text-white-light'
                                : 'text-primary bg-white-light'
                        }`}
                    >
                        {tab?.title}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabsData?.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    {tab?.components}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default CustomTab;
