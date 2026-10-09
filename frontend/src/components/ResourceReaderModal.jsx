import React, { useState } from 'react';
import {
  X,
  BookOpen,
  FileText,
  Download,
  Copy,
  Check,
  ExternalLink,
  GraduationCap,
  Calendar,
  Share2
} from 'lucide-react';
import { resourceContents } from '../data/resourceContents';

export const ResourceReaderModal = ({ isOpen, onClose, resource }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !resource) return null;

  const content = resourceContents[resource.resource_id] || {
    title: resource.title,
    course: `${resource.course_code} - ${resource.course_name}`,
    module: resource.module_title || 'Core Syllabus Unit',
    author: 'Faculty of Computer Science & Engineering',
    lastUpdated: 'Spring 2026 Session',
    sections: [
      {
        heading: 'Overview & Study Guide',
        content: resource.description || 'This module provides fundamental concepts, theoretical proofs, and practical problem sets for university examination revision.'
      },
      {
        heading: 'Key Conceptual Takeaways',
        content: `1. Review core definitions and relational theorems.\n2. Work through the step-by-step example problem sets provided in class.\n3. Refer to standard university textbooks and past 5-year question papers for model patterns.`
      }
    ]
  };

  const handleCopy = () => {
    const fullText = content.sections.map(s => `${s.heading}\n\n${s.content}`).join('\n\n---\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="min-h-full flex items-center justify-center p-3 sm:p-5">
        <div className="relative w-full max-w-3xl bg-white rounded border border-slate-300 shadow-xl overflow-hidden flex flex-col max-h-[88vh]">
          {/* Header */}
          <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-semibold text-slate-700 shrink-0">
                {resource.course_code}
              </span>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {content.title}
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">
                  {resource.resource_type} • {content.module}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-4">
              <button
                type="button"
                onClick={handleCopy}
                className="p-1 text-slate-500 hover:text-slate-800 rounded border border-slate-300 hover:bg-slate-50 transition-colors text-xs flex items-center gap-1 px-2 py-0.5"
                title="Copy Notes Text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span className="text-[11px] font-medium">{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader Metadata */}
          <div className="px-5 py-2 bg-slate-50/60 border-b border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-600 shrink-0">
            <div>
              <span className="text-slate-400">Author: </span>
              <strong>{content.author}</strong>
            </div>
            <div className="text-slate-400 font-mono">
              Session: {content.lastUpdated}
            </div>
          </div>

          {/* Reader Body Content */}
          <div className="p-5 overflow-y-auto space-y-4 text-slate-800 leading-relaxed text-xs">
            {content.sections.map((section, idx) => (
              <div key={idx} className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1">
                  {section.heading}
                </h4>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap overflow-x-auto">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-2.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
            <span className="text-[11px] text-slate-500 font-mono">
              Academic Course Reference Document
            </span>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
