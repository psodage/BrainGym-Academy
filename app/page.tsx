'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Brain, Check, ChevronRight, Flower2, Heart, Leaf, Mail, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Target, Wind, X, type LucideIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { contact, programs, activities, benefits, reasons } from './content';

const navigation = [['About', 'about'], ['Programs', 'programs'], ['Benefits', 'benefits'], ['Contact', 'contact']];
const icons: Record<string, LucideIcon> = { flower: Flower2, brain: Brain, target: Target, leaf: Leaf, speech: MessageCircle };
function Icon({ icon: Component, className = '' }: { icon: LucideIcon, className?: string }) { return <Component aria-hidden="true" className={className} strokeWidth={1.6} />; }
function Brand({ footer = false }: { footer?: boolean }) { return <a className={`brand ${footer ? 'footer-brand' : ''}`} href="#home" aria-label="BrainGym Academy home"><img src="/braingym-logo.jpeg" alt="" width="1254" height="1254" /><span><strong>BrainGym <span>Academy</span></strong><small>Calm minds. Brighter futures.</small></span></a>; }
function DemoLink({ className = '' }: { className?: string }) { return <a href="#contact" className={`button primary ${className}`}>Book a Demo Class <Icon icon={ArrowRight}/></a>; }
function EnquiryForm() {
 const [program, setProgram] = useState('');
 const [errors, setErrors] = useState<Record<string, string>>({});
 const [notice, setNotice] = useState('');
 const formRef = useRef<HTMLFormElement>(null);
 function submit(event: FormEvent<HTMLFormElement>) {
   event.preventDefault(); setNotice('');
   const data = new FormData(event.currentTarget); const next: Record<string,string> = {};
   if (String(data.get('parent') || '').trim().length < 2) next.parent = 'Please enter your name (at least 2 characters).';
   const phone = String(data.get('phone') || '').trim();
   if (!/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g,'').length < 7 || phone.replace(/\D/g,'').length > 15) next.phone = 'Please enter a valid phone number with 7–15 digits.';
   const age = String(data.get('age') || '').trim();
   if(age && (!/^\d+$/.test(age) || Number(age) <= 0)) next.age = 'Enter an age in whole years greater than zero.';
   if(!program) next.program = 'Please choose a program or “Help me choose”.';
   setErrors(next);
   if(Object.keys(next).length) { requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()); return; }
   setNotice('Your request has not been sent. Online enquiries are not connected yet. Please try again once the academy’s contact details are available.');
 }
 const error = (key: string) => errors[key] ? <span className="field-error" id={`${key}-error`}>{errors[key]}</span> : null;
 return <form ref={formRef} onSubmit={submit} noValidate className="enquiry-form">
   <h3>Request a demo class</h3><p className="form-intro">A small first step towards new possibilities.</p>
   <div className="form-grid">
    <div className="field full"><label htmlFor="parent">Parent or guardian name <span aria-hidden="true">*</span></label><input id="parent" name="parent" autoComplete="name" placeholder="Your full name" required maxLength={120} aria-invalid={!!errors.parent} aria-describedby={errors.parent ? 'parent-error' : undefined}/>{error('parent')}</div>
    <div className="field"><label htmlFor="phone">Phone number <span aria-hidden="true">*</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" required maxLength={25} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined}/>{error('phone')}</div>
    <div className="field"><label htmlFor="age">Child’s age <span>(optional)</span></label><input id="age" name="age" inputMode="numeric" placeholder="Age in years" maxLength={3} aria-invalid={!!errors.age} aria-describedby={errors.age ? 'age-error' : undefined}/>{error('age')}</div>
    <div className="field full"><label htmlFor="program">Interested program <span aria-hidden="true">*</span></label><Select value={program} onValueChange={setProgram} name="program"><SelectTrigger id="program" className="program-select" aria-required="true" aria-invalid={!!errors.program} aria-describedby={errors.program ? 'program-error' : undefined}><SelectValue placeholder="Choose a program"/></SelectTrigger><SelectContent position="popper">{[...programs.map(p=>p.name), 'Help me choose'].map(name => <SelectItem className="min-h-11" key={name} value={name}>{name}</SelectItem>)}</SelectContent></Select>{error('program')}</div>
    <div className="field full"><label htmlFor="message">Message <span>(optional)</span></label><textarea id="message" name="message" rows={3} maxLength={2000} placeholder="Anything you’d like us to know?"/></div>
   </div>
   <p className="service-notice"><Icon icon={ShieldCheck}/>Online enquiries are not connected yet. This form cannot send your details.</p>
   <button type="submit" className="button primary submit">Request a Demo Class <Icon icon={ArrowRight}/></button>
   <p role="status" aria-live="polite" className={notice ? 'submission-notice' : 'sr-only'}>{notice}</p>
   <p className="required-note">* Required fields</p>
 </form>
}
export default function Home() {
 const [menuOpen, setMenuOpen] = useState(false); const menuButton = useRef<HTMLButtonElement>(null);
 useEffect(() => { const close = (event: KeyboardEvent) => { if(event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); } }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, [menuOpen]);
 return <>
  <a className="skip-link" href="#main">Skip to content</a>
  <header className="site-header"><div className="container header-inner"><Brand/><nav aria-label="Main navigation" className="desktop-nav">{navigation.map(([label,id])=><a href={`#${id}`} key={id}>{label}</a>)}</nav><DemoLink className="header-cta"/><button ref={menuButton} type="button" className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={()=>setMenuOpen(!menuOpen)}><Icon icon={menuOpen ? X : Menu}/></button></div>
  <nav id="mobile-navigation" aria-label="Mobile navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} onClick={(e)=>{if((e.target as HTMLElement).closest('a')) setMenuOpen(false);}}>{navigation.map(([label,id])=><a href={`#${id}`} key={id}>{label}<Icon icon={ChevronRight}/></a>)}<DemoLink/></nav></header>
  <main id="main">
   <section className="hero" id="home"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line"/>Mindful learning. Confident children.</p><h1>Nurturing young minds for a <span>better tomorrow.</span></h1><p className="hero-description">Engaging meditation, mindfulness, and brain-training activities that help children practice focus, build confidence, and develop positive everyday habits.</p><div className="hero-actions"><DemoLink/><a className="button secondary" href="#programs">Explore Our Programs</a></div><div className="hero-note"><Icon icon={Heart}/><span>Growing with care. Learning through play.</span></div></div><figure className="hero-visual"><div className="hero-art"><img src="/learning-illustration.webp" alt="Illustration of children and a teacher exploring puzzles and creative activities in a calm learning space" width="1200" height="900" fetchPriority="high"/></div><figcaption><span><Icon icon={Leaf}/>A little curiosity. A little calm.</span><span>A world of possibility.</span></figcaption></figure></div></section>
   <div className="brand-strip"><div className="container strip-inner"><span><Icon icon={Flower2}/>Calm minds</span><span><Icon icon={Target}/>Focused kids</span><span><Icon icon={Sparkles}/>Brighter futures</span></div></div>
   <section id="about" className="section about-section"><div className="container about-grid"><div><p className="eyebrow">A LITTLE ABOUT US</p><h2>A positive space to<br className="desktop-break"/> learn, grow, and discover.</h2></div><div className="about-copy"><p>At BrainGym Academy, we believe every child has unique potential. We bring together meditation, mindfulness, memory games, breathing exercises, and creative learning in a friendly, supportive environment.</p><p>Our activities encourage positive habits and skills children can practice in learning and everyday life.</p><a href="#programs" className="text-link">Discover how we learn <Icon icon={ArrowRight}/></a></div></div></section>
   <section id="programs" className="section programs-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">OUR PROGRAMS</p><h2>Different ways to learn.<br/>Room for every child to grow.</h2></div><p>Thoughtfully guided activities that make practicing everyday skills feel engaging and enjoyable.</p></div><div className="program-grid">{programs.map((p,i)=><article className={`program-card ${p.color}`} key={p.name}><div className="program-card-top"><span className="icon-tile"><Icon icon={icons[p.icon]}/></span><span className="program-number">0{i+1}</span></div><h3>{p.name}</h3><p>{p.description}</p></article>)}<div className="program-invite"><Icon icon={Heart}/><h3>Find their<br/>happy place.</h3><p>Let’s explore what feels right for your child.</p><a href="#contact" className="text-link">Ask about a program <Icon icon={ArrowRight}/></a></div></div></div></section>
   <section className="activities-section"><div className="container activities-layout"><div><p className="eyebrow">LEARNING THROUGH ACTIVITIES</p><h2>Little moments.<br/>Meaningful practice.</h2></div><ul className="activity-list">{activities.map((activity,i)=><li key={activity}><span className={`activity-dot dot-${i%3}`}/>{activity}</li>)}</ul></div></section>
   <section id="benefits" className="section benefits-section"><div className="container benefits-grid"><div className="benefits-intro"><div className="large-icon"><Icon icon={Brain}/></div><p className="eyebrow">BENEFITS FOR CHILDREN</p><h2>Small practices that support everyday growth.</h2><p>Every child learns at their own pace. Our activities are designed to support these skills through regular practice and participation.</p><a href="#contact" className="text-link">Take the first step <Icon icon={ArrowRight}/></a></div><ul className="benefits-list">{benefits.map((benefit,i)=><li key={benefit}><span className={`check-circle check-${i%3}`}><Icon icon={Check}/></span>{benefit}</li>)}</ul></div></section>
   <section className="section why-section"><div className="container"><div className="center-heading"><p className="eyebrow">WHY BRAINGYM ACADEMY?</p><h2>A thoughtful approach.<br/>A childhood full of possibilities.</h2></div><div className="reasons-grid">{reasons.map((reason,i)=><div className="reason" key={reason}><Icon icon={[Heart,Sparkles,Leaf,Flower2,Brain,Wind][i]}/><h3>{reason}</h3></div>)}</div></div></section>
   <section className="vision-section"><div className="container vision-inner"><p className="eyebrow">OUR VISION</p><blockquote>“To create a positive environment where children can learn, grow, focus, and discover their potential.”</blockquote><span className="vision-rule"/></div></section>
   <section id="contact" className="section contact-section"><div className="container contact-grid"><div className="contact-copy"><p className="eyebrow">LET’S GROW TOGETHER</p><h2>Let’s help your child take the next step.</h2><p>Enquire about our programs or request a demo class.</p><div className="contact-details"><h3>{contact.name}</h3><div><Icon icon={Phone}/><span><small>Phone</small>{contact.phone}</span></div><div><Icon icon={MapPin}/><span><small>Location</small>{contact.location}</span></div><div><Icon icon={Mail}/><span><small>Email</small>{contact.email}</span></div></div></div><EnquiryForm/></div></section>
  </main>
  <footer className="site-footer"><div className="container"><div className="footer-top"><div><Brand footer/><p className="footer-tagline">{contact.tagline}</p></div><div className="footer-nav"><h3>Explore</h3>{navigation.map(([label,id])=><a href={`#${id}`} key={id}>{label}</a>)}</div><div className="footer-contact"><h3>Get in touch</h3><p>{contact.phone}</p><p>{contact.email}</p><p>{contact.location}</p></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} BrainGym Academy. All rights reserved.</p><p>Nurturing young minds, one day at a time.</p></div></div></footer>
 </>
}
