// components/ui/CrudModal.jsx - کامپوننت یکپارچه UI
import { Trash2, X, AlertCircle, Plus, Edit, Save } from 'lucide-react';

const CrudModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  mode, // 'delete', 'add', 'edit'
  title,
  itemTitle = "",
  isLoading = false,
  error = null,
  children,
  onSubmit // برای حالت add/edit
}) => {
  if (!isOpen) return null;

  const getTitle = () => {
    if (title) return title;
    switch(mode) {
      case 'delete': return 'حذف آیتم';
      case 'add': return 'افزودن آیتم جدید';
      case 'edit': return 'ویرایش آیتم';
      default: return 'مدیریت';
    }
  };

  const getIcon = () => {
    switch(mode) {
      case 'delete': return <Trash2 className="w-5 h-5 text-red-400" />;
      case 'add': return <Plus className="w-5 h-5 text-green-400" />;
      case 'edit': return <Edit className="w-5 h-5 text-blue-400" />;
      default: return null;
    }
  };

  const getButtonText = () => {
    switch(mode) {
      case 'delete': return 'حذف';
      case 'add': return 'افزودن';
      case 'edit': return 'ویرایش';
      default: return 'تایید';
    }
  };

  const getButtonColor = () => {
    switch(mode) {
      case 'delete': return 'bg-red-600 hover:bg-red-700';
      case 'add': return 'bg-green-600 hover:bg-green-700';
      case 'edit': return 'bg-blue-600 hover:bg-blue-700';
      default: return 'bg-purple-600 hover:bg-purple-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1F1F24] rounded-xl border border-[#3F3F46] max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#3F3F46]">
          <div className="flex items-center gap-2">
            {getIcon()}
            <h3 className="text-lg font-semibold text-white">{getTitle()}</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1 rounded-lg hover:bg-[#2A2A30] transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={onSubmit}>
          <div className="p-4">
            {mode === 'delete' && (
              <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20 mb-4">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  آیا از حذف <span className="text-red-400 font-semibold">{itemTitle}</span> اطمینان دارید؟
                </p>
              </div>
            )}
            
            {children}
            
            {error && (
              <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20 mt-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-4 border-t border-[#3F3F46]">
            <button
              type={mode === 'delete' ? 'button' : 'submit'}
              onClick={mode === 'delete' ? onConfirm : undefined}
              disabled={isLoading}
              className={`flex-1 px-4 py-2 ${getButtonColor()} text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  در حال {getButtonText()}...
                </>
              ) : (
                getButtonText()
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-[#2A2A30] text-gray-300 rounded-lg hover:bg-[#3F3F46] transition-colors"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrudModal;