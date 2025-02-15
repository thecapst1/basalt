'use client';
import SettingsMenu from '@/components/SettingsMenu';
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { FileDown } from 'lucide-react';

const HostNavbar = () => {
    const menuItems = [{ icon: <FileDown />, function: false }];

    return (
        <div className="flex w-full">
            <Menubar>
                <MenubarMenu>
                    {menuItems.map((item, index) => (
                        <MenubarTrigger key={index}>{item.icon}</MenubarTrigger>
                    ))}
                </MenubarMenu>
            </Menubar>
            <span className="ml-auto">
                <SettingsMenu />
            </span>
        </div>
    );
};

export default HostNavbar;
