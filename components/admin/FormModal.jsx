// components/ui/FormModal.jsx
"use client";

import { useState, useEffect } from "react";
import { X, Plus, Edit2 } from "lucide-react";

const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  mode = "add",
  title = "",
  initialData = {},
  fields = [],
  isLoading = false,
  customChildren = null,
}) => {
  const [formData, setFormData] = useState({});

  // پر کردن فرم با داده‌های اولیه در حالت ویرایش
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    } else {
      // reset فرم در حالت افزودن
      const emptyData = {};
      fields.forEach((field) => {
        emptyData[field.name] = "";
      });
      setFormData(emptyData);
    }
  }, [mode, initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (type === "file" && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: reader.result, // base64 string
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="h-full bg-[#1F1F24] rounded-xl border border-[#3F3F46] w-full max-w-lg shadow-2xl overflow-y-scroll">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#3F3F46]">
          <div className="flex items-center gap-2">
            {mode === "add" ? (
              <Plus className="w-5 h-5 text-green-400" />
            ) : (
              <Edit2 className="w-5 h-5 text-blue-400" />
            )}
            <h3 className="text-lg font-semibold text-white">
              {title || (mode === "add" ? "افزودن جدید" : "ویرایش")}
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1 rounded-lg hover:bg-[#2A2A30] transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Body - فرم */}
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            {customChildren
              ? // فرم سفارشی
                typeof customChildren === "function"
                ? customChildren({ formData, handleChange })
                : customChildren
              : // فرم خودکار بر اساس فیلدها
                fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm text-gray-300 mb-1">
                      {field.label}
                      {field.required && (
                        <span className="text-red-400 mr-1">*</span>
                      )}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        rows={field.rows || 4}
                        className="w-full p-2 bg-[#2A2A30] border border-[#3F3F46] rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                        required={field.required}
                      />
                    ) : field.type === "select" ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full p-2 bg-[#2A2A30] border border-[#3F3F46] rounded-lg focus:outline-none focus:border-purple-500 text-white"
                        required={field.required}
                      >
                        <option value="">انتخاب کنید</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "file" ? (
                      <input
                        type="file"
                        name={field.name}
                        onChange={handleChange}
                        accept={field.accept}
                        className="w-full p-2 bg-[#2A2A30] border border-[#3F3F46] rounded-lg focus:outline-none focus:border-purple-500 text-white file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                        required={field.required && mode === "add"}
                      />
                    ) : (
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full p-2 bg-[#2A2A30] border border-[#3F3F46] rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500"
                        required={field.required}
                      />
                    )}

                    {field.hint && (
                      <p className="text-xs text-gray-500 mt-1">{field.hint}</p>
                    )}
                  </div>
                ))}
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-4 border-t border-[#3F3F46]">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  در حال ذخیره...
                </>
              ) : mode === "add" ? (
                "افزودن"
              ) : (
                "ویرایش"
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

export default FormModal;
