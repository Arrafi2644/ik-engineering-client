import { Link, useLocation } from 'react-router-dom';
import { Users, Settings, FileText, Home, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/ik-Logo.png'

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ isOpen = true, onToggle }: SidebarProps) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: <Home size={20} />,
    },
    {
      href: '/admin/service-management',
      label: 'Services',
      icon: <Package size={20} />,
    },
    {
      href: '/admin/user-management',
      label: 'Team Members',
      icon: <Users size={20} />,
    },
    {
      href: '/admin/settings',
      label: 'Settings',
      icon: <Settings size={20} />,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        'bg-sidebar border-r border-sidebar-border transition-all duration-300',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo */}
      <div className="h-16 border-b border-sidebar-border flex items-center justify-center px-4">
        {isOpen && (
           <link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-full h-10 rounded-md flex items-center justify-center">
            <img
              src={logo}
             
              className="rounded-md object-contain w-full h-full"
              alt="Ik engineering Logo"
            />
          </div>
        </link>
        )}
        {!isOpen && (
          <Link to="/" className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center text-sidebar-primary-foreground font-bold text-sm">
            IK
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200',
              isActive(item.href)
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/20'
            )}
            title={!isOpen ? item.label : undefined}
          >
            {item.icon}
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <div className="text-xs text-sidebar-foreground/50 text-center">
          {isOpen && <p>v1.0.0</p>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
