// src/pages/ArtPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { supabase } from "../supabaseClient";

/* local fallback */
const LOCAL_ARTS = [
  { slug: "dantes-inferno", src: "/wallpaperflare.com_wallpaper.jpg", title: "Dante's Inferno", price: 1850, artist: "Lilla Hazlett" },
  { slug: "school-of-athens", src: "/schoolofathens.png", title: "The School of Athens", price: 2000, artist: "Manuela Rahimi" },
  { slug: "sabine-women", src: "/sabine.jpg", title: "The Intervention of the Sabine Women", price: 1300, artist: "Mariann Saner" },
  { slug: "babel", src: "/babel.jpg", title: "Tower of Babel", price: 1250, artist: "Evette Ciesielski" },
  { slug: "napoleon-munich", src: "/ankunft-napoleons-in-m-nchen.jpg!Large.jpg", title: "Entry of Napoleon I into Munich", price: 1700, artist: "Renee Thatcher" },
  { slug: "van-gogh", src: "/gogh.jpeg", title: "Self-Portrait: Vincent Van Gogh", price: 1250, artist: "Vincent Van Gogh" },
  { slug: "coronation-napoleon", src: "/coronation.jpg", title: "The Coronation of Napoleon", price: 2100, artist: "Jacques David" },
  { slug: "greece", src: "/greece.jpg", title: "Greece", price: 950, artist: "Unknown" },
];

const STORAGE_BUCKET = "art-images";
const PLACEHOLDER_SRC = "/placeholder.png";

export default function ArtPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [arts, setArts] = useState(LOCAL_ARTS);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadFromSupabase() {
      setLoading(true);
      try {
        // include `artist` in the select so we get it from DB
        const { data, error } = await supabase
          .from("artworks")
          .select("id,slug,title,price,img_path,description,artist")
          .order("id", { ascending: true });

        if (error) throw error;
        if (!data || data.length === 0) {
          if (mounted) setArts(LOCAL_ARTS);
          return;
        }

        const mapped = data.map((row) => {
          // try to get local fallback for artist if DB doesn't have one
          const localMatch = LOCAL_ARTS.find((a) => a.slug === row.slug);

          let src = PLACEHOLDER_SRC;
          if (row.img_path && typeof row.img_path === "string") {
            if (row.img_path.startsWith("http")) {
              src = row.img_path;
            } else {
              const path = row.img_path.replace(/^\/+/, "");
              try {
                const { data: publicData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
                src = publicData?.publicUrl || PLACEHOLDER_SRC;
              } catch {
                src = PLACEHOLDER_SRC;
              }
            }
          }

          const dbArtist = row.artist && typeof row.artist === "string" && row.artist.trim() ? row.artist.trim() : null;
          const fallbackArtistFromDescription = row.description ? row.description.split("\n")[0].slice(0, 40) : null;

          return {
            id: row.id,
            slug: row.slug || `art-${row.id}`,
            src,
            title: row.title || "Untitled",
            price: Number(row.price) || 0,
            description: row.description || "",
            // priority: explicit DB artist -> local fallback by slug -> description snippet -> final fallback
            artist: dbArtist || (localMatch && localMatch.artist) || fallbackArtistFromDescription || "Unknown Artist",
          };
        });

        if (mounted) setArts(mapped);
      } catch (err) {
        if (mounted) setArts(LOCAL_ARTS);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (supabase) loadFromSupabase();
    else {
      setLoading(false);
      setArts(LOCAL_ARTS);
    }

    return () => {
      mounted = false;
    };
  }, []);

  // small filtered list for "featured" view — you can change filter logic
  const featured = arts.filter((a) => !query || a.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ minHeight: "100vh", padding: "28px 20px", fontFamily: "Inter, Arial, sans-serif", background: "#fff" }}>
      {/* Search & category row */}
      <div style={{
        maxWidth: 1160,
        margin: "0 auto 28px auto",
        display: "flex",
        gap: 12,
        alignItems: "center",
      }}>
        <input
          aria-label="Search artworks"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, artist"
          style={{
            flex: 1,
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid #e3cdb7",
            boxShadow: "none",
            fontSize: 15,
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: 220,
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid #e3cdb7",
            fontSize: 15,
            background: "#fff",
          }}
        >
          <option value="">Choose category</option>
          <option value="prints">Prints</option>
          <option value="oil">Oil</option>
          <option value="watercolor">Watercolor</option>
        </select>
        <button
          onClick={() => {/* search already reactive */}}
          style={{
            padding: "12px 20px",
            borderRadius: 10,
            border: "none",
            background: "#b97a2b",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Featured header */}
      <div style={{
        maxWidth: 1160,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <h2 style={{ margin: 0, fontSize: 20, color: "#111", fontWeight: 700 }}>Featured Artworks</h2>
        <button
          onClick={() => navigate("/art")}
          style={{
            padding: "8px 14px",
            borderRadius: 10,
            border: "1px solid #e3cdb7",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            color: "#b97a2b"
          }}
        >
          View All
        </button>
      </div>

      {/* Horizontal scroll band (matches design) */}
      <div style={{
        maxWidth: 1160,
        margin: "18px auto",
        overflowX: "auto",
        paddingBottom: 8,
        WebkitOverflowScrolling: "touch",
      }}>
        <div style={{
          display: "flex",
          gap: 18,
          padding: "6px 6px 12px 6px",
          alignItems: "flex-start",
        }}>
          {loading ? (
            <div style={{ padding: 28, color: "#888" }}>Loading...</div>
          ) : (
            featured.map((art, idx) => (
              <div
                key={art.slug || art.id || idx}
                onClick={() => navigate(`/art/${art.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") navigate(`/art/${art.slug}`); }}
                style={{
                  width: 220,
                  flex: "0 0 220px",
                  cursor: "pointer",
                }}
              >
                <div style={{
                  width: "100%",
                  height: 140,
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
                  background: "#f3f1ef",
                }}>
                  <img
                    src={art.src}
                    alt={art.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => { e.currentTarget.src = PLACEHOLDER_SRC; }}
                  />
                </div>

                <div style={{ marginTop: 10 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: "#111" }}>
                    {art.title}
                  </div>

                  <div style={{ fontSize: 13, color: "#7b7b7b", marginTop: 6 }}>
                    {art.artist || "Unknown Artist"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Grid view (below the featured band) */}
      <div style={{
        maxWidth: 1160,
        margin: "20px auto 60px auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
        }}>
          {arts.map((art, i) => {
            const slug = art.slug || art.id || i;
            return (
              <div
                key={slug}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/art/${slug}`)}
                onKeyDown={(e) => { if (e.key === "Enter") navigate(`/art/${slug}`); }}
                aria-label={`View details for ${art.title}`}
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                  transition: "transform 150ms ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ width: "100%", height: 180, overflow: "hidden" }}>
                  <img src={art.src} alt={art.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => e.currentTarget.src = PLACEHOLDER_SRC} />
                </div>
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 700 }}>{art.title}</div>
                  <div style={{ fontSize: 13, color: "#888", marginTop: 6 }}>{art.artist || "Unknown Artist"}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* subtle global styles */}
      <style>{`
        /* hide default scrollbar in Webkit but allow scroll */
        ::-webkit-scrollbar { height: 8px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.06); border-radius: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        /* make keyboard focus visible for interactive cards */
        [role="button"]:focus { outline: 3px solid rgba(185,122,43,0.15); outline-offset: 3px; }
      `}</style>
    </div>
  );
}
