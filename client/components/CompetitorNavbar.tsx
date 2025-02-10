"use client";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/dist/client/components/navigation';
import { useState } from 'react';

export default function CompetitorNavbar() {
    const router = useRouter();
    const [tabValue, setTabValue] = useState('text-Editor');

    const handleTabChange = (value: string) => {
        setTabValue(value);
        if (value === 'Leaderboard') {
            router.push('/leaderboard');
        }
    };
    return (
        <div className="item-center flex min-w-full justify-between p-1.5">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Import File</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Undo</MenubarItem>
                        <MenubarItem>Redo</MenubarItem>
                        <MenubarItem>Cut</MenubarItem>
                        <MenubarItem>Copy</MenubarItem>
                        <MenubarItem>Paste</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Team</MenubarTrigger>
                    <MenubarContent>
                        <MenubarRadioGroup>
                            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                        </MenubarRadioGroup>
                        <MenubarSeparator />
                        <MenubarItem inset>Edit</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem inset>Add Team Member</MenubarItem>
                        <MenubarItem inset>Contact Instructor</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Tabs defaultValue="text-Editor" value={tabValue} onValueChange={handleTabChange}>
                            <TabsList>
                                <TabsTrigger value="text-Editor">Text Editor</TabsTrigger>
                                <TabsTrigger value="Leaderboard">Leaderboard</TabsTrigger>
                            </TabsList>
                            <TabsContent value="text-Editor">
                            </TabsContent>
                        </Tabs>

                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className="min-w-[10vw]">
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Programming Language" />
                    </SelectTrigger>
                    <SelectContent className="min-w-20">
                        <SelectGroup>
                            <SelectLabel>Languages</SelectLabel>
                            <SelectItem value="Python">Python</SelectItem>
                            <SelectItem value="Java">Java</SelectItem>
                            <SelectItem value="JavaScript">JavaScript</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
