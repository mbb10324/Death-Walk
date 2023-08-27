import './BugReportModal.css';
import React, { useState } from 'react';
import { classList } from '../../Helpers/Utils';

export default function BugReportButton() {
    const [formFields, setFormFields] = useState({ title: '', description: '', email: '' }); //holds form entries
    const [showBugReport, setShowBugReport] = useState(false); //bool state to toggle bug report modal

    //called after submit button is pressed
    function submitBugs(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //in place of this console log an api can be called to send an email to the app owner
        console.log(formFields);
        setFormFields({ title: '', description: '', email: '' });
        setShowBugReport(false);
    };

    return (
        <>
            <button className={classList([
                'text-xs w-[12vw]',
                'h-[3vw]',
                'mt-[1vw]',
                'mb-[1vw]',
                'bg-[rgb(255,165,0)]',
                'border-[1px]',
                'border-zinc-900',
                'rounded-3xl',
                'transition-all',
                'duration-500',
                'ease-[cubic-bezier(0.79,-1.00,0.37,2.00)]',
                'hover:bg-zinc-900',
                'hover:text-white',
                'hover:scale-125',
            ])} onClick={() => setShowBugReport(!showBugReport)}>Report Bugs</button>

            {showBugReport &&
                <div
                    className={classList([
                        'fixed',
                        'top-0',
                        'left-0',
                        'w-screen',
                        'h-screen',
                        'flex',
                        'items-center',
                        'justify-center',
                        'z-50',
                        'bg-black',
                        'bg-opacity-50',
                        'animate-[fadeIn_.1s_linear]'
                    ])}>
                    <div className={classList([
                        'bg-zinc-900',
                        'border-[1px]',
                        'border-black',
                        'p-4',
                        'w-[25vw]',
                        'rounded-3xl',
                        'overflow-hidden',
                        'shadow-2xl',
                        'shadow-black'
                    ])}>
                        <h1 className='text-slate-200 text-sm'>
                            Report a Bug</h1>
                        <form className='overflow-hidden h-full' onSubmit={submitBugs}>
                            <h2 className="text-slate-200 text-xs mt-3">Title</h2>

                            <input
                                placeholder="Enter title"
                                className="w-[20vw] text-center placeholder-zine-700 text-white leading-8 bg-zinc-700 rounded-3xl border-[1px] border-lime-500 focus:border-[rgb(255,165,0)] outline-none"
                                type="text"
                                value={formFields.title}
                                onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                            />

                            <h2 className="text-slate-200 text-xs mt-3">Description</h2>

                            <input
                                placeholder="Enter description"
                                className="w-[20vw] text-center placeholder-zine-700 text-white leading-8 bg-zinc-700 rounded-3xl border-[1px] border-lime-500 focus:border-[rgb(255,165,0)] outline-none"
                                type="textarea"
                                value={formFields.description}
                                onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                            />

                            <h2 className="text-slate-200 text-xs mt-3">Email</h2>

                            <input
                                placeholder="Enter email"
                                className="w-[20vw] text-center placeholder-zine-700 text-white leading-8 bg-zinc-700 rounded-3xl border-[1px] border-lime-500 focus:border-[rgb(255,165,0)] outline-none"
                                type="text"
                                value={formFields.email}
                                onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                            />

                            <button className={classList([
                                'mr-6',
                                'text-xs',
                                'w-[6vw]',
                                'leading-8',
                                'mt-4',
                                'mb-2',
                                'bg-pink-200',
                                'rounded-3xl',
                                'text-zinc-900',
                                'hover:bg-lime-500',
                                'hover:text-white',
                                'transition-all',
                                'duration-500',
                                'ease-[cubic-bezier(0.79,-1.00,0.37,2.00)]',
                                'hover:scale-125'
                            ])} onClick={() => setShowBugReport(false)}>Close</button>
                            <button className={classList([
                                'text-xs',
                                'w-[6vw]',
                                'leading-8',
                                'mt-4',
                                'mb-2', 
                                'bg-pink-200',
                                'rounded-3xl',
                                'text-zinc-900',
                                'hover:bg-lime-500',
                                'hover:text-white',
                                'transition-all',
                                'duration-500',
                                'ease-[cubic-bezier(0.79,-1.00,0.37,2.00)]',
                                'hover:scale-125'
                            ])}>Submit</button>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};