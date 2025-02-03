'use client';
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { FileDown } from 'lucide-react';

const HeaderMenu = () => {
    const menuItems = [{ icon: <FileDown />, function: false }];

    return (
        <Menubar>
            <MenubarMenu>
                {menuItems.map((item, index) => (
                    <MenubarTrigger key={index}>{item.icon}</MenubarTrigger>
                ))}
            </MenubarMenu>
        </Menubar>
    );
};

export default HeaderMenu;
