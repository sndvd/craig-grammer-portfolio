import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Menu, Edit2, Save } from 'lucide-react';

export default function CraigGrammerPortfolio() {
  const [currentPage, setCurrentPage] = useState('home');
  const [editMode, setEditMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCartPanel, setShowCartPanel] = useState(false);

  const [siteData, setSiteData] = useState(() => {
    const saved = localStorage.getItem('craigGrammerData');
    return saved ? JSON.parse(saved) : {
      artistName: 'Craig Grammer',
      tagline: 'Fine Art Celebrating Portuguese Heritage',
      bio: 'Craig Grammer discovered his passion for painting in retirement in Porto, Portugal. His bold, vibrant paintings capture the soul of Portugal from colorful architecture to carnival traditions.',
      email: 'craiggrammar.art@gmail.com',
      instagram: 'https://instagram.com/craiggrammar',
      heroPainting: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eoqOkpaanqKmqsrO0tba2uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlbaWmJmaoqOkpaanqKmqsrO0tba2uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q==',
      paintings: [
        { id: 1, title: 'Lisbon Layers', medium: 'Oil on canvas', year: 2024, price: 145, image: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=500&h=600&fit=crop' },
        { id: 2, title: 'Entrudo Dreams', medium: 'Acrylic on canvas', year: 2024, price: 125, image: 'https://images.unsplash.com/photo-1549887534-7d4d5b3e0c47?w=500&h=600&fit=crop' },
        { id: 3, title: 'Carnival Triptych', medium: 'Mixed media', year: 2024, price: 155, image: 'https://images.unsplash.com/photo-1578321272176-a43c4a1ce2df?w=500&h=600&fit=crop' },
        { id: 4, title: 'Venetian Whispers', medium: 'Oil on linen', year: 2024, price: 135, image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=500&h=600&fit=crop' },
        { id: 5, title: 'Sacred Dusk', medium: 'Acrylic on canvas', year: 2024, price: 115, image: 'https://images.unsplash.com/photo-1591339944742-f049cd1ccbba?w=500&h=600&fit=crop' },
        { id: 6, title: 'Night Celebration', medium: 'Oil on canvas', year: 2024, price: 140, image: 'https://images.unsplash.com/photo-1578301978162-7282eae4e00f?w=500&h=600&fit=crop' },
      ],
      printSizes: [
        { size: 'A4', price: 35 },
        { size: 'A3', price: 55 },
        { size: 'A2', price: 85 },
      ],
    };
  });

  useEffect(() => {
    localStorage.setItem('craigGrammerData', JSON.stringify(siteData));
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

    if (!editMode) {
      const Component = as;
      return <Component>{children}</Component>;
    }

    if (isEditing) {
      return as === 'span' ? (
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            updateField(path, value);
            setIsEditing(false);
          }}
          style={{ padding: '4px 8px', border: '2px solid #FCD34D', background: '#FFFACD' }}
        />
      ) : (
        <textarea
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            updateField(path, value);
            setIsEditing(false);
          }}
          style={{ padding: '8px', border: '2px solid #FCD34D', background: '#FFFACD', width: '100%' }}
          rows={4}
        />
      );
    }

    return (
      <div onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}>
        <span>{children}</span>
      </div>
    );
  };

  const EditableImage = ({ path, src }) => {
    if (!editMode) {
      return <img src={src} style={{ width: '100%', display: 'block', height: 'auto' }} />;
    }

    return (
      <div style={{ position: 'relative', cursor: 'pointer' }}>
        <img src={src} style={{ width: '100%', display: 'block', height: 'auto', opacity: 0.7 }} />
        <label style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          📸 Upload
          <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && handleImageUpload(path, e.target.files[0])} style={{ display: 'none' }} />
        </label>
      </div>
    );
  };

  const PaintingCard = ({ painting, index }) => {
    const idx = siteData.paintings.findIndex((p) => p.id === painting.id);
    return (
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ marginBottom: '1rem', overflow: 'hidden', borderRadius: '8px', height: '300px', background: '#f0f0f0' }}>
          <EditableImage path={`paintings.${idx}.image`} src={painting.image} />
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#2A4463', margin: '0.5rem 0', fontFamily: 'Playfair Display, serif' }}>
          <EditableText path={`paintings.${idx}.title`}>{painting.title}</EditableText>
        </h3>
        <p style={{ fontSize: '13px', color: '#6B6158', margin: '0.3rem 0' }}>
          <EditableText path={`paintings.${idx}.medium`}>{painting.medium}</EditableText>
        </p>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#D4956F', margin: '0.5rem 0' }}>€{painting.price}</p>
      </div>
    );
  };

  const ProductCard = ({ painting, index }) => {
    const [size, setSize] = useState('A4');
    const idx = siteData.paintings.findIndex((p) => p.id === painting.id);
    const price = siteData.printSizes.find((s) => s.size === size)?.price || 35;

    return (
      <div style={{ border: '1px solid #D4B5A6', padding: '1.5rem', borderRadius: '8px', background: 'white' }}>
        <div style={{ marginBottom: '1rem', height: '250px', overflow: 'hidden', borderRadius: '8px', background: '#f0f0f0' }}>
          <EditableImage path={`paintings.${idx}.image`} src={painting.image} />
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#2A4463', margin: '0.5rem 0', fontFamily: 'Playfair Display, serif' }}>
          <EditableText path={`paintings.${idx}.title`}>{painting.title}</EditableText>
        </h3>
        <p style={{ fontSize: '12px', color: '#6B6158', margin: '0.5rem 0' }}>
          <EditableText path={`paintings.${idx}.medium`}>{painting.medium}</EditableText>
        </p>
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '0.5rem' }}>Size:</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #D4956F', borderRadius: '4px' }}>
            {siteData.printSizes.map((s) => <option key={s.size} value={s.size}>{s.size} - €{s.price}</option>)}
          </select>
        </div>
        <button onClick={() => setCart([...cart, { id: `${painting.id}-${size}`, title: painting.title, size, price, image: painting.image }])} style={{ width: '100%', padding: '10px', background: '#2A4463', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }} onMouseEnter={(e) => e.target.style.background = '#D4956F'} onMouseLeave={(e) => e.target.style.background = '#2A4463'}>
          Add to Cart
        </button>
      </div>
    );
  };

  const HomePage = () => (
    <div>
      <style>{`
        @keyframes heroPaintingAnimation {
          0% { opacity: 0; filter: blur(20px); }
          20% { opacity: 1; filter: blur(0px); }
          80% { opacity: 1; filter: blur(0px); }
          100% { opacity: 0; filter: blur(20px); }
        }
        @keyframes nameAppearAnimation {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero */}
      <div style={{
        position: 'relative',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F5F0EB',
        overflow: 'hidden'
      }}>
        {/* Hero Painting with Animation */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${siteData.heroPainting}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0,
          animation: 'heroPaintingAnimation 7s ease-in-out forwards'
        }} />

        {/* Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(245,240,235,0.92), rgba(239,212,160,0.92))'
        }} />

        {/* Name appears after painting fades */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          opacity: 0,
          animation: 'nameAppearAnimation 0.8s ease-out 6.5s forwards'
        }}>
          <h1 style={{ fontSize: '72px', fontWeight: 500, color: '#2A4463', margin: '0.5rem 0', fontFamily: 'Playfair Display, serif', letterSpacing: '-1px' }}>
            <EditableText path="artistName">{siteData.artistName}</EditableText>
          </h1>
          <p style={{ fontSize: '14px', color: '#9B8F7D', textTransform: 'uppercase', letterSpacing: '2px', margin: '1rem 0 2rem 0', fontFamily: 'Montserrat, sans-serif' }}>
            <EditableText path="tagline">{siteData.tagline}</EditableText>
          </p>
          <button onClick={() => setCurrentPage('gallery')} style={{
            padding: '12px 36px',
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
          }} onMouseEnter={(e) => { e.target.style.background = '#D4956F'; e.target.style.color = 'white'; }} onMouseLeave={(e) => { e.target.style.background = 'white'; e.target.style.color = '#D4956F'; }}>
            View Gallery
          </button>
        </div>

        {/* Edit hero painting in edit mode */}
        {editMode && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            zIndex: 20,
            fontSize: '12px',
            textAlign: 'center'
          }}>
            <label style={{ cursor: 'pointer', display: 'block' }}>
              📸 Click to replace hero painting
              <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && handleImageUpload('heroPainting', e.target.files[0])} style={{ display: 'none' }} />
            </label>
          </div>
        )}
      </div>

      {/* Featured */}
      <div style={{ padding: '4rem 2rem', background: 'linear-gradient(to bottom, white, #FEF3C7)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '2rem', fontFamily: 'Playfair Display, serif' }}>Featured Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          {siteData.paintings.slice(0, 3).map((p, i) => <PaintingCard key={p.id} painting={p} index={i} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={() => setCurrentPage('gallery')} style={{
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
          }} onMouseEnter={(e) => e.target.style.background = '#D4956F'} onMouseLeave={(e) => e.target.style.background = '#2A4463'}>
            View All →
          </button>
        </div>
      </div>
    </div>
  );

  const GalleryPage = () => (
    <div style={{ padding: '4rem 2rem', background: 'linear-gradient(to bottom, white, #FEF3C7)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '2rem', fontFamily: 'Playfair Display, serif' }}>Complete Gallery</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {siteData.paintings.map((p, i) => <PaintingCard key={p.id} painting={p} index={i} />)}
        </div>
      </div>
    </div>
  );

  const ShopPage = () => (
    <div style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg, #F5EFE7, white, #FEF3C7)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '2rem', fontFamily: 'Playfair Display, serif' }}>Fine Art Prints</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {siteData.paintings.map((p, i) => <ProductCard key={p.id} painting={p} index={i} />)}
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div style={{ padding: '4rem 2rem', background: 'linear-gradient(to bottom, white, #FEF3C7)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '2rem', fontFamily: 'Playfair Display, serif' }}>About Craig Grammer</h1>
        <p style={{ fontSize: '16px', color: '#6B6158', lineHeight: 1.8, marginBottom: '2rem' }}>
          <EditableText path="bio" as="p">{siteData.bio}</EditableText>
        </p>
        <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #FFE8D6, #FFD4B3)', borderRadius: '8px', border: '2px solid #D4956F' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#2A4463', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Contact</h3>
          <p style={{ fontSize: '16px', fontWeight: 600, color: '#D4956F', margin: 0 }}>
            <EditableText path="email">{siteData.email}</EditableText>
          </p>
        </div>
      </div>
    </div>
  );

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ minHeight: '100vh', background: 'white', fontFamily: 'DM Sans, sans-serif', color: '#333' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Montserrat:wght@300;400;500;600&family=DM+Sans:wght@400;500&display=swap');
      `}</style>

      {/* Navbar */}
      <nav style={{ background: 'white', borderBottom: '1px solid #E8E3DC', padding: '1.5rem', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 onClick={() => setCurrentPage('home')} style={{ fontSize: '16px', fontWeight: 600, color: '#2A4463', cursor: 'pointer', letterSpacing: '1.5px', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', margin: 0 }}>
            Craig Grammer
          </h1>

          <div style={{ display: 'flex', gap: '2rem' }}>
            {[
              { label: 'Gallery', page: 'gallery' },
              { label: 'Shop', page: 'shop' },
              { label: 'About', page: 'about' }
            ].map((nav) => (
              <button key={nav.page} onClick={() => setCurrentPage(nav.page)} style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: currentPage === nav.page ? '#D4956F' : '#6B6158',
                fontWeight: 500,
                textTransform: 'uppercase',
                fontSize: '12px',
                letterSpacing: '0.8px',
                fontFamily: 'Montserrat, sans-serif',
                transition: 'color 0.3s',
                padding: 0
              }} onMouseEnter={(e) => { e.target.style.color = '#D4956F'; }} onMouseLeave={(e) => { e.target.style.color = currentPage === nav.page ? '#D4956F' : '#6B6158'; }}>
                {nav.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => setShowCartPanel(!showCartPanel)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', fontSize: '20px', padding: 0 }}>
              🛒 {cart.length > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#D4956F', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{cart.length}</span>}
            </button>
            <button onClick={() => setEditMode(!editMode)} style={{ background: editMode ? '#FEF3C7' : 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, color: editMode ? '#B45309' : '#D4956F' }}>
              {editMode ? '💾' : '✏️'}
            </button>
          </div>
        </div>
      </nav>

      {editMode && <div style={{ background: '#FEF3C7', border: '2px solid #FCD34D', padding: '1rem', color: '#92400E', fontWeight: 600, fontSize: '14px' }}>✏️ Edit Mode ON - Click text/images to edit. Click 💾 when done.</div>}

      {showCartPanel && (
        <div style={{ position: 'fixed', right: 0, top: '100px', width: '100%', maxWidth: '400px', background: 'white', borderLeft: '3px solid #D4956F', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', zIndex: 40, padding: '2rem', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 500, color: '#2A4463', marginBottom: '1.5rem', fontFamily: 'Playfair Display, serif', margin: 0 }}>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p style={{ color: '#6B6158' }}>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} style={{ borderBottom: '1px solid #E8E3DC', paddingBottom: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0, marginBottom: '0.3rem', fontSize: '14px' }}>{item.title}</p>
                    <p style={{ fontSize: '12px', color: '#9B8F7D', margin: '0.3rem 0' }}>{item.size}</p>
                    <p style={{ fontWeight: 600, color: '#D4956F', marginTop: '0.5rem', margin: 0 }}>€{item.price}</p>
                  </div>
                  <button onClick={() => setCart(cart.filter((c) => c.id !== item.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D74949', fontSize: '18px', padding: 0 }}>✕</button>
                </div>
              ))}
              <div style={{ borderTop: '2px solid #E8E3DC', paddingTop: '1rem', marginTop: '1rem' }}>
                <p style={{ fontSize: '16px', fontWeight: 600, display: 'flex', justifyContent: 'space-between', margin: '0 0 1rem 0' }}>
                  <span>Total:</span> <span style={{ color: '#D4956F' }}>€{cartTotal}</span>
                </p>
                <button style={{ width: '100%', background: '#2A4463', color: 'white', padding: '10px', fontWeight: 600, borderRadius: '4px', border: 'none', cursor: 'pointer', transition: 'all 0.3s', textTransform: 'uppercase', fontSize: '12px' }} onMouseEnter={(e) => e.target.style.background = '#D4956F'} onMouseLeave={(e) => e.target.style.background = '#2A4463'}>
                  Checkout →
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
      </main>

      <footer style={{ background: 'linear-gradient(90deg, #2A4463, #1a2634)', color: '#E8E3DC', padding: '3rem 1.5rem', marginTop: '4rem', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', fontFamily: 'Playfair Display, serif', margin: '0 0 0.5rem 0' }}>Craig Grammer Fine Art</p>
        <p style={{ fontSize: '12px', margin: 0 }}>Porto, Portugal © 2024</p>
      </footer>
    </div>
  );
}
