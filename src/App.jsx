import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, X, Menu, Edit2, Save } from 'lucide-react';

export default function CraigGrammerPortfolio() {
  const [currentPage, setCurrentPage] = useState('home');
  const [editMode, setEditMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCartPanel, setShowCartPanel] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [siteData, setSiteData] = useState(() => {
    const saved = localStorage.getItem('craigGrammerFinal');
    return saved ? JSON.parse(saved) : {
      artistName: 'Craig Grammer',
      tagline: 'Fine Art Celebrating Portuguese Heritage',
      subtitle: 'Artist based in Porto, Portugal',
      bio: 'Craig Grammer discovered his passion for painting in retirement—a promise kept to his beloved wife, Shoshana. With encouragement from his teacher and studio head Cynthia, and brilliant support from photographer and printer Mark, Craig\'s bold, vibrant paintings capture the soul of Portugal: from the colorful layered architecture of Lisbon to the electrifying energy of traditional carnival celebrations.',
      storyTitle: 'From Appreciation to Fine Art',
      storyText: 'I decided to take my appreciation and love of painting to the next level in retirement in Portugal as a promise to my wife. With encouragement and inspiration from my teacher, Cynthia, and my photographer/printer Mark—especially my loving wife Shoshana—I\'ve started a new career selling fine art prints of my original paintings.',
      email: 'craiggrammar.art@gmail.com',
      instagram: 'https://instagram.com/craiggrammar',
      aboutText: 'After a full career in other pursuits, Craig Grammer found his true calling in the vibrant light and culture of Porto, Portugal. His paintings are conversations between bold color and careful observation—capturing the spirit of carnival traditions, the architectural poetry of historic neighborhoods, maritime heritage, and the warmth of Portuguese daily life.',
      paintings: [
        {
          id: 1,
          title: 'Lisbon Layers',
          medium: 'Oil on canvas',
          dimensions: '80x100cm',
          year: 2024,
          price: 145,
          image: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=600&h=700&fit=crop',
        },
        {
          id: 2,
          title: 'Entrudo Dreams',
          medium: 'Acrylic on canvas',
          dimensions: '70x90cm',
          year: 2024,
          price: 125,
          image: 'https://images.unsplash.com/photo-1549887534-7d4d5b3e0c47?w=600&h=700&fit=crop',
        },
        {
          id: 3,
          title: 'Carnival Triptych',
          medium: 'Oil & acrylic mixed media',
          dimensions: '85x105cm',
          year: 2024,
          price: 155,
          image: 'https://images.unsplash.com/photo-1578321272176-a43c4a1ce2df?w=600&h=700&fit=crop',
        },
        {
          id: 4,
          title: 'Venetian Whispers',
          medium: 'Oil on linen',
          dimensions: '75x95cm',
          year: 2024,
          price: 135,
          image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=600&h=700&fit=crop',
        },
        {
          id: 5,
          title: 'Sacred Dusk',
          medium: 'Acrylic on canvas',
          dimensions: '65x85cm',
          year: 2024,
          price: 115,
          image: 'https://images.unsplash.com/photo-1591339944742-f049cd1ccbba?w=600&h=700&fit=crop',
        },
        {
          id: 6,
          title: 'Night Celebration',
          medium: 'Oil on canvas',
          dimensions: '80x100cm',
          year: 2024,
          price: 140,
          image: 'https://images.unsplash.com/photo-1578301978162-7282eae4e00f?w=600&h=700&fit=crop',
        },
      ],
      printSizes: [
        { size: 'A4', price: 35 },
        { size: 'A3', price: 55 },
        { size: 'A2', price: 85 },
      ],
    };
  });

  useEffect(() => {
    localStorage.setItem('craigGrammerFinal', JSON.stringify(siteData));
  }, [siteData]);

  const updateField = (path, value) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(siteData));
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setSiteData(newData);
  };

  const handleImageUpload = (path, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateField(path, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const EditableText = ({ path, children, as = 'span' }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(children);
    const inputRef = useRef(null);

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [isEditing]);

    const handleSave = () => {
      updateField(path, value);
      setIsEditing(false);
    };

    if (!editMode) {
      const Component = as;
      return <Component>{children}</Component>;
    }

    if (isEditing) {
      return as === 'span' ? (
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          style={{ background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '4px', padding: '4px 8px' }}
        />
      ) : (
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          style={{ background: '#FEF3C7', border: '1px solid #FCD34D', width: '100%', padding: '8px', borderRadius: '4px' }}
          rows={5}
        />
      );
    }

    const Component = as;
    return (
      <div
        onClick={() => setIsEditing(true)}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <Component>{children}</Component>
      </div>
    );
  };

  const EditableImage = ({ path, src, alt }) => {
    if (!editMode) {
      return <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />;
    }

    return (
      <div style={{ position: 'relative' }}>
        <img src={src} alt={alt} style={{ width: '100%', display: 'block', cursor: 'pointer' }} />
        <label style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '4px'
        }}>
          📸 Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                handleImageUpload(path, e.target.files[0]);
              }
            }}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    );
  };

  const PaintingCard = ({ painting, index }) => {
    const paintingIndex = siteData.paintings.findIndex((p) => p.id === painting.id);
    return (
      <div style={{ animation: `fadeInUp 0.8s ease-out ${index * 0.1}s backwards` }}>
        <div style={{ overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem' }}>
          <EditableImage
            path={`paintings.${paintingIndex}.image`}
            src={painting.image}
            alt={painting.title}
          />
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#2A4463', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>
          <EditableText path={`paintings.${paintingIndex}.title`}>{painting.title}</EditableText>
        </h3>
        <p style={{ fontSize: '13px', color: '#6B6158', marginBottom: '0.5rem' }}>
          <EditableText path={`paintings.${paintingIndex}.medium`}>{painting.medium}</EditableText>
        </p>
        <p style={{ fontSize: '13px', color: '#D4956F', fontWeight: 600 }}>€{painting.price}</p>
      </div>
    );
  };

  const ProductCard = ({ painting, index }) => {
    const [selectedSize, setSelectedSize] = useState('A4');
    const paintingIndex = siteData.paintings.findIndex((p) => p.id === painting.id);

    const addToCart = () => {
      const price = siteData.printSizes.find((s) => s.size === selectedSize)?.price || 35;
      setCart([
        ...cart,
        {
          id: `${painting.id}-${selectedSize}`,
          title: painting.title,
          size: selectedSize,
          price: price,
          image: painting.image,
        },
      ]);
    };

    return (
      <div style={{ 
        border: '1px solid #D4B5A6', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        background: 'white',
        animation: `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`
      }}>
        <div style={{ overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem', height: '240px', background: 'linear-gradient(135deg, #A8C5D8, #EFD4A0)' }}>
          <EditableImage
            path={`paintings.${paintingIndex}.image`}
            src={painting.image}
            alt={painting.title}
          />
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#2A4463', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>
          <EditableText path={`paintings.${paintingIndex}.title`}>{painting.title}</EditableText>
        </h3>
        <p style={{ fontSize: '13px', color: '#6B6158', marginBottom: '1rem' }}>
          <EditableText path={`paintings.${paintingIndex}.medium`}>{painting.medium}</EditableText>
        </p>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '0.5rem', color: '#2A4463' }}>
            Print Size
          </label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #D4956F', borderRadius: '4px', fontSize: '14px' }}
          >
            {siteData.printSizes.map((s) => (
              <option key={s.size} value={s.size}>
                {s.size} - €{s.price}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={addToCart}
          style={{
            width: '100%',
            background: '#2A4463',
            color: 'white',
            padding: '10px',
            fontWeight: 600,
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => { e.target.style.background = '#D4956F'; }}
          onMouseLeave={(e) => { e.target.style.background = '#2A4463'; }}
        >
          Add to Cart
        </button>
      </div>
    );
  };

  const HomePage = () => (
    <div>
      {/* Hero */}
      <div style={{
        position: 'relative',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #F5F0EB 0%, #EFD4A0 100%)',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          background: 'linear-gradient(135deg, #D4956F 0%, #A8C5D8 50%, #E8B5A0 100%)',
          animation: 'dissolveIn 2.5s ease-in-out forwards, dissolveOut 2.5s ease-in-out 3.5s forwards'
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(245,240,235,0.9), rgba(239,212,160,0.9))'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          opacity: 0,
          animation: 'nameAppear 0.8s ease-out 4s forwards'
        }}>
          <h1 style={{ fontSize: '72px', fontWeight: 500, color: '#2A4463', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif', letterSpacing: '-1px' }}>
            <EditableText path="artistName">{siteData.artistName}</EditableText>
          </h1>
          <p style={{ fontSize: '13px', color: '#9B8F7D', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', fontFamily: 'Montserrat, sans-serif' }}>
            <EditableText path="tagline">{siteData.tagline}</EditableText>
          </p>
          <button
            onClick={() => setCurrentPage('gallery')}
            style={{
              padding: '12px 32px',
              border: '2px solid #D4956F',
              background: 'white',
              color: '#D4956F',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => { e.target.style.background = '#D4956F'; e.target.style.color = 'white'; }}
            onMouseLeave={(e) => { e.target.style.background = 'white'; e.target.style.color = '#D4956F'; }}
          >
            Explore Gallery
          </button>
        </div>
      </div>

      {/* Bio */}
      <div style={{ padding: '4rem 1.5rem', background: 'white', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <EditableText path="bio" as="p" style={{ fontSize: '16px', color: '#6B6158', lineHeight: 1.8 }}>
          {siteData.bio}
        </EditableText>
      </div>

      {/* Featured */}
      <div style={{ padding: '4rem 1.5rem', background: 'linear-gradient(to bottom, white, #FEF3C7)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>
          Featured Works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          {siteData.paintings.slice(0, 3).map((p, i) => (
            <PaintingCard key={p.id} painting={p} index={i} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={() => setCurrentPage('gallery')}
            style={{
              padding: '12px 36px',
              background: '#2A4463',
              color: 'white',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: '4px',
              border: 'none',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => { e.target.style.background = '#D4956F'; }}
            onMouseLeave={(e) => { e.target.style.background = '#2A4463'; }}
          >
            View Complete Gallery →
          </button>
        </div>
      </div>
    </div>
  );

  const GalleryPage = () => (
    <div style={{ padding: '4rem 1.5rem', background: 'linear-gradient(to bottom, white, #FEF3C7)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '2rem', fontFamily: 'Playfair Display, serif' }}>
          Complete Gallery
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {siteData.paintings.map((p, i) => (
            <PaintingCard key={p.id} painting={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );

  const ShopPage = () => (
    <div style={{ padding: '4rem 1.5rem', background: 'linear-gradient(135deg, #F5EFE7, white, #FEF3C7)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>
          Fine Art Prints
        </h1>
        <p style={{ textAlign: 'center', color: '#9B8F7D', marginBottom: '2rem' }}>
          ✦ Premium Prints | Ships from Porto, Portugal ✦
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {siteData.paintings.map((p, i) => (
            <ProductCard key={p.id} painting={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div style={{ padding: '4rem 1.5rem', background: 'linear-gradient(to bottom, white, #FEF3C7)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '2rem', fontFamily: 'Playfair Display, serif' }}>
          About Craig Grammer
        </h1>
        <EditableText path="aboutText" as="p" style={{ fontSize: '16px', color: '#6B6158', lineHeight: 1.8, marginBottom: '2rem' }}>
          {siteData.aboutText}
        </EditableText>
        <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #FFE8D6, #FFD4B3)', borderRadius: '8px', border: '2px solid #D4956F' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#2A4463', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Get in Touch</h3>
          <p style={{ color: '#6B6158', marginBottom: '1rem' }}>For inquiries about original works, commissions, or prints:</p>
          <p style={{ fontSize: '18px', fontWeight: 600, color: '#D4956F' }}>
            <EditableText path="email">{siteData.email}</EditableText>
          </p>
          <a href={siteData.instagram} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '1rem', color: '#D4956F', textDecoration: 'none', fontWeight: 600 }}>
            Follow on Instagram →
          </a>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div style={{ padding: '4rem 1.5rem', background: 'linear-gradient(135deg, #F5EFE7, #FEF3C7)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '2rem', fontFamily: 'Playfair Display, serif' }}>
          Contact Craig
        </h1>
        <form style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '2px solid #D4B5A6' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2A4463' }}>Name</label>
            <input type="text" placeholder="Your name" style={{ width: '100%', padding: '10px', border: '1px solid #D4B5A6', borderRadius: '4px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2A4463' }}>Email</label>
            <input type="email" placeholder="your@email.com" style={{ width: '100%', padding: '10px', border: '1px solid #D4B5A6', borderRadius: '4px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2A4463' }}>Message</label>
            <textarea placeholder="Tell Craig about your interest in his work..." rows="6" style={{ width: '100%', padding: '10px', border: '1px solid #D4B5A6', borderRadius: '4px', fontSize: '14px' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#2A4463', color: 'white', fontWeight: 600, borderRadius: '4px', border: 'none', cursor: 'pointer', transition: 'all 0.3s', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}
            onMouseEnter={(e) => { e.target.style.background = '#D4956F'; }}
            onMouseLeave={(e) => { e.target.style.background = '#2A4463'; }}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ minHeight: '100vh', background: 'white', fontFamily: 'DM Sans, sans-serif', color: '#333' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Montserrat:wght@300;400;500;600&family=DM+Sans:wght@400;500&display=swap');
        
        @keyframes dissolveIn {
          0% { opacity: 0; filter: blur(15px); }
          50% { opacity: 1; filter: blur(0px); }
          100% { opacity: 1; filter: blur(0px); }
        }

        @keyframes dissolveOut {
          0% { opacity: 1; filter: blur(0px); }
          100% { opacity: 0; filter: blur(15px); }
        }

        @keyframes nameAppear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ background: 'white', borderBottom: '1px solid #E8E3DC', padding: '1.5rem', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 onClick={() => setCurrentPage('home')} style={{ fontSize: '16px', fontWeight: 600, color: '#2A4463', cursor: 'pointer', letterSpacing: '1.5px', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', margin: 0 }}>
            Craig Grammer
          </h1>

          <div style={{ display: 'none', '@media': '(minWidth: 768px)' }}>
            {[{ label: 'Gallery', page: 'gallery' }, { label: 'Shop', page: 'shop' }, { label: 'About', page: 'about' }, { label: 'Contact', page: 'contact' }].map((nav) => (
              <button key={nav.page} onClick={() => setCurrentPage(nav.page)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: currentPage === nav.page ? '#D4956F' : '#6B6158', fontWeight: 500, textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.8px', fontFamily: 'Montserrat, sans-serif', marginRight: '2rem', transition: 'color 0.3s' }} onMouseEnter={(e) => { e.target.style.color = '#D4956F'; }} onMouseLeave={(e) => { e.target.style.color = currentPage === nav.page ? '#D4956F' : '#6B6158'; }}>
                {nav.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => setShowCartPanel(!showCartPanel)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: '8px', fontSize: '20px' }}>
              🛒 {cart.length > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#D4956F', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{cart.length}</span>}
            </button>
            <button onClick={() => setEditMode(!editMode)} style={{ background: editMode ? '#FEF3C7' : 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '4px', fontSize: '20px', fontWeight: 600, color: editMode ? '#B45309' : '#D4956F' }}>
              {editMode ? '💾' : '✏️'}
            </button>
          </div>
        </div>
      </nav>

      {editMode && <div style={{ background: '#FEF3C7', border: '2px solid #FCD34D', padding: '1rem', color: '#92400E', fontWeight: 600, fontSize: '14px' }}>✏️ Edit Mode Active: Click any text or image to edit. Click 💾 when done.</div>}

      {showCartPanel && (
        <div style={{ position: 'fixed', right: 0, top: '100px', width: '400px', background: 'white', borderLeft: '3px solid #D4956F', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', zIndex: 40, padding: '2rem', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#2A4463', marginBottom: '1.5rem', fontFamily: 'Playfair Display, serif' }}>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p style={{ color: '#6B6158' }}>Your cart is empty. Explore Craig's work!</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} style={{ borderBottom: '1px solid #E8E3DC', paddingBottom: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0, marginBottom: '0.5rem' }}>{item.title}</p>
                    <p style={{ fontSize: '12px', color: '#9B8F7D', margin: 0 }}>{item.size}</p>
                    <p style={{ fontWeight: 600, color: '#D4956F', marginTop: '0.5rem', margin: 0 }}>€{item.price}</p>
                  </div>
                  <button onClick={() => setCart(cart.filter((c) => c.id !== item.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D74949', fontSize: '18px' }}>✕</button>
                </div>
              ))}
              <div style={{ borderTop: '2px solid #E8E3DC', paddingTop: '1rem', marginTop: '1rem' }}>
                <p style={{ fontSize: '18px', fontWeight: 600, display: 'flex', justifyContent: 'space-between', margin: '0 0 1rem 0' }}>
                  <span>Total:</span> <span style={{ color: '#D4956F' }}>€{cartTotal}</span>
                </p>
                <button style={{ width: '100%', background: '#2A4463', color: 'white', padding: '12px', fontWeight: 600, borderRadius: '4px', border: 'none', cursor: 'pointer', transition: 'all 0.3s', textTransform: 'uppercase', fontSize: '12px' }}
                  onMouseEnter={(e) => { e.target.style.background = '#D4956F'; }}
                  onMouseLeave={(e) => { e.target.style.background = '#2A4463'; }}>
                  Proceed to Checkout →
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <footer style={{ background: 'linear-gradient(90deg, #2A4463, #1a2634)', color: '#E8E3DC', padding: '3rem 1.5rem', marginTop: '4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>Craig Grammer Fine Art</p>
          <p style={{ fontSize: '12px', margin: '0' }}>Porto, Portugal</p>
          <p style={{ fontSize: '11px', opacity: 0.7, marginTop: '1rem' }}>© 2024 Craig Grammer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
