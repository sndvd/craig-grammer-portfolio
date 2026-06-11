import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, X, Menu, Edit2, Save, ChevronDown } from 'lucide-react';

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
      bio: 'Craig Grammer discovered his passion for painting in retirement—a promise kept to his beloved wife, Shoshana. With encouragement from his teacher and studio head Cynthia, and brilliant support from photographer and printer Mark, Craig\'s bold, vibrant paintings capture the soul of Portugal: from the colorful layered architecture of Lisbon to the electrifying energy of traditional carnival celebrations. His expressive brushwork and rich palette celebrate the joy, history, and living traditions of his adopted home.',
      storyTitle: 'From Appreciation to Fine Art',
      storyText: 'I decided to take my appreciation and love of painting to the next level in retirement in Portugal as a promise to my wife. With encouragement and inspiration from my teacher and studio head, Cynthia, and my photographer/printer Mark—especially my loving wife Shoshana, friends and family—I\'ve apparently started a new career selling fine art prints of my original paintings.',
      email: 'craiggrammar.art@gmail.com',
      instagram: 'https://instagram.com/craiggrammar',
      aboutText: 'After a full career in other pursuits, Craig Grammer found his true calling in the vibrant light and culture of Porto, Portugal. His paintings are conversations between bold color and careful observation—capturing the spirit of carnival traditions, the architectural poetry of historic neighborhoods, maritime heritage, and the warmth of Portuguese daily life.\n\nWith each work, Craig celebrates the beauty found in cultural memory and living traditions. Whether depicting the electrifying energy of traditional carnival figures in their striped regalia, the intricate geometry of historic buildings, or intimate moments of coastal life, his paintings invite viewers into a deeper appreciation of Portugal\'s rich heritage.',
      paintings: [
        {
          id: 1,
          title: 'Lisbon Layers',
          medium: 'Oil on canvas',
          dimensions: '80x100cm',
          year: 2024,
          price: 145,
          image: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=600&h=700&fit=crop',
          culturalTheme: 'Historic Architecture'
        },
        {
          id: 2,
          title: 'Entrudo Dreams',
          medium: 'Acrylic on canvas',
          dimensions: '70x90cm',
          year: 2024,
          price: 125,
          image: 'https://images.unsplash.com/photo-1549887534-7d4d5b3e0c47?w=600&h=700&fit=crop',
          culturalTheme: 'Traditional Carnival'
        },
        {
          id: 3,
          title: 'Carnival Triptych',
          medium: 'Oil & acrylic mixed media',
          dimensions: '85x105cm',
          year: 2024,
          price: 155,
          image: 'https://images.unsplash.com/photo-1578321272176-a43c4a1ce2df?w=600&h=700&fit=crop',
          culturalTheme: 'Entrudo Tradition'
        },
        {
          id: 4,
          title: 'Venetian Whispers',
          medium: 'Oil on linen',
          dimensions: '75x95cm',
          year: 2024,
          price: 135,
          image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=600&h=700&fit=crop',
          culturalTheme: 'Maritime Heritage'
        },
        {
          id: 5,
          title: 'Sacred Dusk',
          medium: 'Acrylic on canvas',
          dimensions: '65x85cm',
          year: 2024,
          price: 115,
          image: 'https://images.unsplash.com/photo-1591339944742-f049cd1ccbba?w=600&h=700&fit=crop',
          culturalTheme: 'Religious Heritage'
        },
        {
          id: 6,
          title: 'Night Celebration',
          medium: 'Oil on canvas',
          dimensions: '80x100cm',
          year: 2024,
          price: 140,
          image: 'https://images.unsplash.com/photo-1578301978162-7282eae4e00f?w=600&h=700&fit=crop',
          culturalTheme: 'Carnival Traditions'
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

  const EditableText = ({ path, className, as = 'span', children }) => {
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
      return <Component className={className}>{children}</Component>;
    }

    if (isEditing) {
      return (
        <div className="relative inline-block">
          {as === 'span' ? (
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className={`${className} bg-yellow-50 border border-yellow-300 rounded px-2 py-1`}
            />
          ) : (
            <textarea
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleSave}
              className={`${className} bg-yellow-50 border border-yellow-300 w-full p-2 rounded`}
              rows={as === 'p' ? 5 : 2}
            />
          )}
        </div>
      );
    }

    const Component = as;
    return (
      <div
        onClick={() => setIsEditing(true)}
        className={`${className} cursor-pointer hover:bg-yellow-50 hover:px-2 hover:py-1 transition-colors relative group rounded`}
      >
        <Component>{children}</Component>
        <Edit2 className="absolute -right-6 top-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  const EditableImage = ({ path, src, alt, className, showFrame = false }) => {
    if (!editMode) {
      if (showFrame) {
        return (
          <div className="p-6 bg-white border-8 border-gray-900 shadow-2xl">
            <img src={src} alt={alt} className={className} />
          </div>
        );
      }
      return <img src={src} alt={alt} className={className} />;
    }

    return (
      <div className="relative group">
        {showFrame && <div className="absolute -inset-4 bg-gray-900 border-8 border-gray-900" />}
        <img src={src} alt={alt} className={`${className} cursor-pointer relative z-10`} />
        <label className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100 rounded">
          <div className="text-white font-bold">📸 Upload</div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                handleImageUpload(path, e.target.files[0]);
              }
            }}
            className="hidden"
          />
        </label>
      </div>
    );
  };

  const PaintingCard = ({ painting, index, showFrame = false }) => {
    const paintingIndex = siteData.paintings.findIndex((p) => p.id === painting.id);

    return (
      <div
        className="group"
        style={{
          animation: `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`,
        }}
      >
        <div className={`relative overflow-hidden ${showFrame ? '' : 'rounded-lg'}`}>
          <EditableImage
            path={`paintings.${paintingIndex}.image`}
            src={painting.image}
            alt={painting.title}
            className={`w-full ${showFrame ? 'h-96' : 'h-80'} object-cover group-hover:scale-105 transition-transform duration-700 ease-out`}
            showFrame={showFrame}
          />
          {!showFrame && <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
        </div>
        <div className={`${showFrame ? '' : 'mt-6 px-4'}`}>
          <EditableText
            path={`paintings.${paintingIndex}.title`}
            className="text-lg font-semibold text-gray-800 mt-4"
            as="h3"
          >
            {painting.title}
          </EditableText>
          <EditableText
            path={`paintings.${paintingIndex}.medium`}
            className="text-sm text-gray-600 mt-2"
          >
            {painting.medium}
          </EditableText>
          {painting.culturalTheme && (
            <p className="text-xs text-amber-700 italic mt-2 font-semibold">
              ✦ {painting.culturalTheme}
            </p>
          )}
          <div className="flex justify-between items-center mt-3 text-xs text-gray-600">
            <EditableText
              path={`paintings.${paintingIndex}.dimensions`}
              className="text-xs"
            >
              {painting.dimensions}
            </EditableText>
            <EditableText
              path={`paintings.${paintingIndex}.year`}
              className="text-xs"
            >
              {painting.year}
            </EditableText>
          </div>
        </div>
      </div>
    );
  };

  const ProductCard = ({ painting, index }) => {
    const [selectedSize, setSelectedSize] = useState(siteData.printSizes[0].size);
    const paintingIndex = siteData.paintings.findIndex((p) => p.id === painting.id);

    const addToCart = () => {
      const selectedPrint = siteData.printSizes.find((s) => s.size === selectedSize);
      setCart([
        ...cart,
        {
          id: `${painting.id}-${selectedSize}`,
          title: painting.title,
          size: selectedSize,
          price: selectedPrint.price,
          image: painting.image,
        },
      ]);
    };

    return (
      <div
        className="border border-gray-300 p-6 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500 group"
        style={{
          animation: `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`,
        }}
      >
        <div className="relative overflow-hidden rounded-lg mb-6 bg-gradient-to-br from-blue-50 to-red-50 p-4 border-8 border-gray-900">
          <EditableImage
            path={`paintings.${paintingIndex}.image`}
            src={painting.image}
            alt={painting.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
            showFrame={false}
          />
        </div>
        <EditableText
          path={`paintings.${paintingIndex}.title`}
          className="text-lg font-semibold text-gray-800 mb-2"
          as="h3"
        >
          {painting.title}
        </EditableText>
        <EditableText
          path={`paintings.${paintingIndex}.medium`}
          className="text-sm text-gray-600 mb-4"
        >
          {painting.medium}
        </EditableText>

        <div className="mb-6">
          <label className="block text-sm text-gray-800 font-semibold mb-3">
            Print Size
          </label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 text-gray-800 bg-white rounded-lg font-semibold hover:border-amber-600 transition-colors"
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
          className="w-full bg-gray-900 text-white py-3 font-semibold rounded-lg hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    );
  };

  // HOME PAGE
  const HomePage = () => (
    <div className="overflow-hidden">
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

        .hero-image { 
          animation: dissolveIn 2.5s ease-in-out forwards, dissolveOut 2.5s ease-in-out 3.5s forwards;
        }

        .hero-content {
          animation: nameAppear 0.8s ease-out 4s forwards;
          opacity: 0;
        }

        h1, .section-title {
          font-family: 'Playfair Display', serif;
        }

        nav, button, label, .navbar-nav {
          font-family: 'Montserrat', sans-serif;
        }

        body, p {
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 px-6 py-20 overflow-hidden">
        <div 
          className="hero-image absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #D4956F 0%, #A8C5D8 50%, #E8B5A0 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/90 via-white/85 to-orange-50/90" />

        <div className="hero-content relative z-10 text-center max-w-3xl">
          <h1 style={{ fontSize: '64px', fontWeight: 500, color: '#2A4463', letterSpacing: '-1px', marginBottom: '0.5rem' }}>
            <EditableText
              path="artistName"
              className="text-transparent bg-clip-text"
              as="span"
            >
              {siteData.artistName}
            </EditableText>
          </h1>
          
          <p style={{ fontSize: '13px', color: '#9B8F7D', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
            <EditableText
              path="tagline"
              className=""
              as="span"
            >
              {siteData.tagline}
            </EditableText>
          </p>

          <p style={{ fontSize: '13px', color: '#9B8F7D', marginBottom: '2rem' }}>
            <EditableText
              path="subtitle"
              className=""
              as="span"
            >
              {siteData.subtitle}
            </EditableText>
          </p>

          <button
            onClick={() => setCurrentPage('gallery')}
            style={{
              padding: '12px 32px',
              border: '2px solid #D4956F',
              background: 'white',
              color: '#D4956F',
              textDecoration: 'none',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600,
              fontFamily: "'Montserrat', sans-serif",
              cursor: 'pointer',
              transition: 'all 0.3s',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#D4956F';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#D4956F';
            }}
          >
            Explore Gallery
          </button>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-40 bg-gradient-to-b from-amber-600 to-transparent" />
        <div className="max-w-3xl mx-auto">
          <EditableText
            path="bio"
            className="text-lg text-gray-700 leading-relaxed text-center font-light"
            as="p"
          >
            {siteData.bio}
          </EditableText>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-50 to-orange-50 border-t-4 border-b-4 border-gray-300">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontSize: '32px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '2rem', fontFamily: "'Playfair Display', serif" }}>
            <EditableText
              path="storyTitle"
              className=""
              as="span"
            >
              {siteData.storyTitle}
            </EditableText>
          </h2>
          <EditableText
            path="storyText"
            className="text-lg text-gray-800 leading-relaxed text-center italic border-l-4 border-amber-600 pl-6"
            as="p"
          >
            {siteData.storyText}
          </EditableText>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
            Featured Works
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg font-semibold">
            Celebrating Portugal's Rich Heritage & Traditions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {siteData.paintings.slice(0, 3).map((p, i) => (
              <PaintingCard key={p.id} painting={p} index={i} showFrame={false} />
            ))}
          </div>
          <div className="text-center mt-16">
            <button
              onClick={() => setCurrentPage('gallery')}
              style={{
                padding: '12px 36px',
                background: '#2A4463',
                color: 'white',
                textDecoration: 'none',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 600,
                fontFamily: "'Montserrat', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.3s',
                borderRadius: '4px',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#D4956F';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#2A4463';
              }}
            >
              View Complete Gallery →
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  // GALLERY PAGE
  const GalleryPage = () => (
    <div className="py-24 px-6 bg-gradient-to-b from-white to-amber-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Montserrat:wght@300;400;500;600&family=DM+Sans:wght@400;500&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        h1, .section-title {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <h1 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
          Complete Gallery
        </h1>
        <p className="text-center text-gray-600 mb-20 text-lg font-semibold">
          Craig's Original Paintings: A Journey Through Portuguese Culture
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {siteData.paintings.map((p, i) => (
            <PaintingCard key={p.id} painting={p} index={i} showFrame={false} />
          ))}
        </div>
      </div>
    </div>
  );

  // SHOP PAGE
  const ShopPage = () => (
    <div className="py-24 px-6 bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Montserrat:wght@300;400;500;600&family=DM+Sans:wght@400;500&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        h1, .section-title {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <h1 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
          Fine Art Prints
        </h1>
        <p className="text-center text-gray-600 mb-4 text-lg font-semibold">
          Bring Craig's Paintings Home
        </p>
        <p className="text-center text-amber-800 font-bold mb-16 text-lg">
          ✦ Premium Prints | Ships from Porto, Portugal ✦
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {siteData.paintings.map((p, i) => (
            <ProductCard key={p.id} painting={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );

  // ABOUT PAGE
  const AboutPage = () => (
    <div className="py-24 px-6 bg-gradient-to-b from-white to-amber-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Montserrat:wght@300;400;500;600&family=DM+Sans:wght@400;500&display=swap');
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        h1, h2 {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <h1 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', marginBottom: '2rem', textAlign: 'center', fontFamily: "'Playfair Display', serif" }}>
          About {siteData.artistName}
        </h1>

        <div style={{ animation: 'fadeInUp 0.8s ease-out 0.2s backwards' }}>
          <EditableText
            path="aboutText"
            className="text-lg text-gray-800 leading-relaxed mb-6 whitespace-pre-wrap"
            as="p"
          >
            {siteData.aboutText}
          </EditableText>
        </div>

        <div
          className="mt-16 p-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg border-4 border-gray-400 shadow-2xl"
          style={{ animation: 'slideIn 0.8s ease-out 0.4s backwards' }}
        >
          <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#2A4463', marginBottom: '1.5rem', fontFamily: "'Playfair Display', serif" }}>Get in Touch</h3>
          <p className="text-gray-800 mb-4 text-lg font-semibold">
            For inquiries about original works, commissions, or prints:
          </p>
          <EditableText
            path="email"
            className="text-2xl font-bold text-amber-700 hover:text-orange-700 cursor-pointer transition-colors"
          >
            {siteData.email}
          </EditableText>
          <p className="text-gray-800 mt-6 font-semibold">Porto, Portugal</p>
          <a
            href={siteData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '1.5rem',
              fontSize: '16px',
              fontWeight: 600,
              color: '#D4956F',
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => { e.target.style.color = '#2A4463'; }}
            onMouseLeave={(e) => { e.target.style.color = '#D4956F'; }}
          >
            Follow on Instagram →
          </a>
        </div>
      </div>
    </div>
  );

  // CONTACT PAGE
  const ContactPage = () => (
    <div className="py-24 px-6 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-2xl mx-auto">
        <h1 style={{ fontSize: '40px', fontWeight: 500, color: '#2A4463', textAlign: 'center', marginBottom: '2rem', fontFamily: "'Playfair Display', serif" }}>
          Contact Craig
        </h1>
        <form
          className="bg-white p-10 rounded-xl shadow-2xl border-4 border-gray-300"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.2s backwards' }}
        >
          <div className="space-y-8">
            <div>
              <label className="block text-gray-900 font-bold mb-3 text-lg">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:outline-none focus:border-amber-600 focus:bg-white transition-all text-lg"
              />
            </div>
            <div>
              <label className="block text-gray-900 font-bold mb-3 text-lg">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:outline-none focus:border-amber-600 focus:bg-white transition-all text-lg"
              />
            </div>
            <div>
              <label className="block text-gray-900 font-bold mb-3 text-lg">Message</label>
              <textarea
                placeholder="Tell Craig about your interest in his work..."
                rows="7"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:outline-none focus:border-amber-600 focus:bg-white transition-all text-lg"
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                background: '#2A4463',
                color: 'white',
                padding: '12px 0',
                fontWeight: 600,
                borderRadius: '4px',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: "'Montserrat', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: 'none'
              }}
              onMouseEnter={(e) => { e.target.style.background = '#D4956F'; }}
              onMouseLeave={(e) => { e.target.style.background = '#2A4463'; }}
            >
              Send Message
            </button>
          </div>
        </form>

        <div
          className="mt-16 text-center"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.4s backwards' }}
        >
          <p className="text-gray-800 mb-6 font-bold text-lg">Follow Craig's Artistic Journey:</p>
          <a
            href={siteData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 36px',
              background: '#D4956F',
              color: 'white',
              fontWeight: 600,
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontFamily: "'Montserrat', sans-serif",
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => { e.target.style.background = '#2A4463'; }}
            onMouseLeave={(e) => { e.target.style.background = '#D4956F'; }}
          >
            Instagram →
          </a>
        </div>
      </div>
    </div>
  );

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      className="min-h-screen bg-white text-gray-800"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Montserrat:wght@300;400;500;600&family=DM+Sans:wght@400;500&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-300 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1
            onClick={() => setCurrentPage('home')}
            style={{ fontSize: '16px', fontWeight: 600, color: '#2A4463', cursor: 'pointer', letterSpacing: '1.5px', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase' }}
          >
            Craig Grammer
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'Gallery', page: 'gallery' },
              { label: 'Shop', page: 'shop' },
              { label: 'About', page: 'about' },
              { label: 'Contact', page: 'contact' },
            ].map((nav) => (
              <button
                key={nav.page}
                onClick={() => setCurrentPage(nav.page)}
                style={{
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  fontSize: '12px',
                  letterSpacing: '0.8px',
                  fontFamily: "'Montserrat', sans-serif",
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: currentPage === nav.page ? '#D4956F' : '#6B6158',
                  transition: 'color 0.3s',
                  paddingBottom: '5px',
                  borderBottom: currentPage === nav.page ? '2px solid #D4956F' : 'none'
                }}
                onMouseEnter={(e) => { e.target.style.color = '#D4956F'; }}
                onMouseLeave={(e) => { e.target.style.color = currentPage === nav.page ? '#D4956F' : '#6B6158'; }}
              >
                {nav.label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCartPanel(!showCartPanel)}
              className="relative p-3 hover:bg-orange-50 rounded-lg transition-colors transform hover:scale-110"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6 text-amber-700" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setEditMode(!editMode)}
              className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-110 font-bold ${
                editMode ? 'bg-yellow-100 text-yellow-900 shadow-lg' : 'hover:bg-orange-50 text-amber-700'
              }`}
              title="Toggle Edit Mode"
            >
              {editMode ? <Save className="w-6 h-6" /> : <Edit2 className="w-6 h-6" />}
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 hover:bg-orange-50 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-300 bg-gradient-to-b from-orange-50 to-white py-6 px-6 space-y-3">
            {[
              { label: 'Gallery', page: 'gallery' },
              { label: 'Shop', page: 'shop' },
              { label: 'About', page: 'about' },
              { label: 'Contact', page: 'contact' },
            ].map((nav) => (
              <button
                key={nav.page}
                onClick={() => {
                  setCurrentPage(nav.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-3 px-4 rounded-lg font-bold transition-all ${
                  currentPage === nav.page
                    ? 'bg-amber-200 text-gray-900'
                    : 'text-gray-700 hover:bg-orange-100'
                }`}
              >
                {nav.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* EDIT MODE INDICATOR */}
      {editMode && (
        <div className="bg-yellow-100 border-b-4 border-yellow-400 px-6 py-4 text-sm font-bold text-yellow-900 shadow-md">
          ✏️ <strong>Edit Mode Active:</strong> Click any text or image to edit it. Click "Save" when done.
        </div>
      )}

      {/* CART PANEL */}
      {showCartPanel && (
        <div className="fixed right-0 top-24 w-full sm:w-96 bg-white border-l-4 border-amber-700 shadow-2xl max-h-[calc(100vh-100px)] overflow-y-auto z-40 rounded-l-xl">
          <div className="p-8">
            <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#2A4463', marginBottom: '1.5rem', fontFamily: "'Playfair Display', serif" }}>
              Shopping Cart
            </h2>
            {cart.length === 0 ? (
              <p className="text-gray-600 text-lg font-semibold">
                Your cart is empty. Ready to explore Craig's work?
              </p>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start pb-4 border-b-2 border-gray-300 hover:bg-orange-50 p-2 rounded transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-gray-800">{item.title}</p>
                        <p className="text-sm text-amber-700 font-semibold">{item.size}</p>
                        <p className="text-lg font-bold text-orange-600 mt-1">€{item.price}</p>
                      </div>
                      <button
                        onClick={() => setCart(cart.filter((c) => c.id !== item.id))}
                        className="text-red-500 hover:text-red-700 ml-2 transform hover:scale-125 transition-transform"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-gray-300 pt-6">
                  <div className="flex justify-between mb-6 text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-orange-600">€{cartTotal}</span>
                  </div>
                  <button
                    style={{
                      width: '100%',
                      background: '#2A4463',
                      color: 'white',
                      padding: '12px 0',
                      fontWeight: 600,
                      borderRadius: '4px',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontFamily: "'Montserrat', sans-serif",
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => { e.target.style.background = '#D4956F'; }}
                    onMouseLeave={(e) => { e.target.style.background = '#2A4463'; }}
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* PAGE CONTENT */}
      <main className="bg-white">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* FOOTER */}
      <footer style={{ background: 'linear-gradient(90deg, #2A4463 0%, #1a2634 100%)', color: '#E8E3DC', padding: '3rem 1.5rem' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 style={{ fontWeight: 600, fontSize: '18px', color: '#D4956F', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif" }}>
                {siteData.artistName}
              </h3>
              <p className="text-amber-200 text-sm font-semibold">
                ✦ Fine Art Celebrating Portuguese Heritage ✦
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="text-sm space-y-2">
                {[
                  { label: 'Gallery', page: 'gallery' },
                  { label: 'Shop Prints', page: 'shop' },
                  { label: 'About Craig', page: 'about' },
                ].map((nav) => (
                  <button
                    key={nav.page}
                    onClick={() => setCurrentPage(nav.page)}
                    className="block hover:text-orange-300 transition-colors font-semibold text-blue-100 bg-none border-none cursor-pointer"
                  >
                    {nav.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-blue-100 text-sm font-semibold">{siteData.email}</p>
              <p className="text-blue-100 text-sm font-semibold mt-2">Porto, Portugal</p>
              <a
                href={siteData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-orange-300 hover:text-orange-100 font-bold transition-colors"
              >
                Instagram →
              </a>
            </div>
          </div>
          <div className="border-t-2 border-gray-700 pt-8 text-center text-sm text-blue-200 font-semibold">
            © 2024 {siteData.artistName}. All rights reserved. Created with passion for Portuguese art and culture.
          </div>
        </div>
      </footer>
    </div>
  );
}
