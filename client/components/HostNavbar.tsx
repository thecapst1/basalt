'use client';
import UserMenu from '@/components/UserMenu';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

export default function HostNavbar() {
    return (
        <div className="flex w-full">
            <span>
                <Button size="icon" variant="ghost">
                    <FileDown />
                </Button>
            </span>
            <span className="ml-auto">
                <UserMenu />
            </span>
        </div>
    );
}
