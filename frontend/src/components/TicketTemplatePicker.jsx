import { useState, useEffect } from 'react';
import {
  FileText,
  X,
  Search,
  TrendingUp,
  Bug,
  Lightbulb,
  CreditCard,
  Key,
  Lock,
  Wrench,
  Download,
  Plug,
  Gauge,
  Shield,
  UserX,
  HelpCircle,
  Settings,
  Zap,
  Target,
  ChevronDown,
  Sparkles,
  Clock
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TicketTemplatePicker = ({ onSelect, onClose }) => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const iconOptions = [
    { name: 'FileText', component: FileText },
    { name: 'Bug', component: Bug },
    { name: 'Lightbulb', component: Lightbulb },
    { name: 'CreditCard', component: CreditCard },
    { name: 'Key', component: Key },
    { name: 'Lock', component: Lock },
    { name: 'Wrench', component: Wrench },
    { name: 'Download', component: Download },
    { name: 'Plug', component: Plug },
    { name: 'Gauge', component: Gauge },
    { name: 'Shield', component: Shield },
    { name: 'UserX', component: UserX },
    { name: 'HelpCircle', component: HelpCircle },
    { name: 'Settings', component: Settings },
    { name: 'Zap', component: Zap },
    { name: 'Target', component: Target },
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: Sparkles },
    { value: 'technical', label: 'Technical', icon: Settings },
    { value: 'billing', label: 'Billing', icon: CreditCard },
    { value: 'account', label: 'Account', icon: Key },
    { value: 'feature_request', label: 'Feature Request', icon: Lightbulb },
    { value: 'bug_report', label: 'Bug Report', icon: Bug },
    { value: 'general', label: 'General', icon: FileText },
  ];

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [searchTerm, selectedCategory, templates]);

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/ticket-templates`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTemplates(response.data);
      setFilteredTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = templates;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTemplates(filtered);
  };

  const handleSelectTemplate = async (template) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/ticket-templates/${template._id}/usage`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error('Error recording usage:', error);
    }
    onSelect(template);
    onClose();
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
      medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      high: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
      urgent: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    };
    return colors[priority] || colors.medium;
  };

  const getCategoryColor = (category) => {
    const colors = {
      technical: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      billing: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
      account: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
      feature_request: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
      bug_report: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
      general: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
    };
    return colors[category] || colors.general;
  };

  const getPriorityLabel = (priority) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  const renderIcon = (iconName, size = 24) => {
    const iconOption = iconOptions.find((opt) => opt.name === iconName);
    if (iconOption) {
      const IconComponent = iconOption.component;
      return <IconComponent size={size} />;
    }
    return <FileText size={size} />;
  };

  const getCategoryIcon = (categoryValue) => {
    const cat = categories.find(c => c.value === categoryValue);
    if (cat && cat.icon) {
      const IconComponent = cat.icon;
      return <IconComponent size={14} />;
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      {/* Main container with enhanced border shadow */}
      <div className="bg-black rounded-2xl border border-gray-700/70 max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(59,130,246,0.15)] shadow-[0_0_80px_rgba(59,130,246,0.08)] transition-shadow duration-500">
        
        {/* Header with enhanced bottom border */}
        <div className="p-6 border-b-2 border-gray-700/70 flex items-center justify-between bg-gradient-to-r from-gray-900/30 to-transparent">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/30"></div>
              <h2 className="text-2xl font-bold text-white">Choose a Template</h2>
            </div>
            <p className="text-sm text-gray-400 ml-4">Start with a pre-defined template to save time</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800/50 rounded-lg transition-all text-gray-400 hover:text-white hover:scale-110"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search & Filter with enhanced bottom border */}
        <div className="p-4 border-b-2 border-gray-700/70 bg-gray-900/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search templates by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/60 border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 pr-10 bg-black/60 border-2 border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full animate-pulse shadow-lg shadow-blue-500/30"></div>
                </div>
              </div>
              <p className="mt-6 text-gray-400 font-medium">Loading templates...</p>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center mb-6 border-2 border-gray-700/50">
                <FileText size={40} className="text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No templates found</h3>
              <p className="text-gray-400 text-center max-w-md">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'No templates match your search criteria. Try adjusting your filters.'
                  : 'No templates are available yet.'}
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-blue-600/20 text-blue-400 rounded-xl hover:bg-blue-600/30 transition-all border-2 border-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-600/20"
              >
                Create ticket from scratch
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <button
                  key={template._id}
                  onClick={() => handleSelectTemplate(template)}
                  onMouseEnter={() => setHoveredTemplate(template._id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                  className={`text-left p-5 bg-black/40 border-2 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    hoveredTemplate === template._id
                      ? 'border-blue-500/60 bg-gray-900/40 shadow-[0_0_30px_rgba(59,130,246,0.15)] shadow-blue-500/10'
                      : 'border-gray-700/50 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]'
                  }`}
                >
                  <div className="flex items-start gap-4 relative">
                    <div
                      className={`p-3 rounded-xl shrink-0 border-2 transition-all duration-300 ${
                        hoveredTemplate === template._id
                          ? 'border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                          : 'border-gray-700/50 group-hover:border-blue-500/30'
                      }`}
                      style={{ backgroundColor: `${template.color}15` }}
                    >
                      <span style={{ color: template.color || '#3b82f6' }} className="transition-transform duration-300 group-hover:scale-110 inline-block">
                        {renderIcon(template.icon, 24)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white transition-colors mb-1">
                        {template.name}
                      </h3>
                      {template.description && (
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                          {template.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-medium border-2 ${getCategoryColor(template.category)}`}>
                          {getCategoryIcon(template.category)}
                          {categories.find(c => c.value === template.category)?.label || template.category}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-medium border-2 ${getPriorityColor(template.priority)}`}>
                          <Clock size={12} />
                          {getPriorityLabel(template.priority)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-800/30 px-2.5 py-0.5 rounded-lg border-2 border-gray-700/30">
                          <TrendingUp size={12} />
                          <span>{template.usageCount || 0} used</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer with enhanced top border */}
        <div className="p-4 border-t-2 border-gray-700/70 bg-gradient-to-r from-gray-900/20 to-transparent">
          <button
            onClick={onClose}
            className="w-full py-3 text-sm text-gray-400 hover:text-white transition-all rounded-xl hover:bg-gray-800/30 group border-2 border-transparent hover:border-gray-700/30"
          >
            <span className="group-hover:underline">Or create ticket from scratch</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketTemplatePicker;