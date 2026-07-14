import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../utils/api';
import { ArrowRight, BadgeCheck, MapPin, Phone, Sparkles, User2 } from "lucide-react";

const Farmers = () => {
  const [allFarmers, setAllFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/farmer/all-farmers/`);
        setAllFarmers(res.data || []);
      } catch (error) {
        console.error(error);
        setAllFarmers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fff8_0%,#ffffff_100%)] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-2">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
            <Sparkles size={16} /> Trusted Farmers
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">Meet our verified farmers</h1>
          <p className="text-slate-600">
            Browse trusted sellers and discover fresh produce from local farms.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="h-24 w-24 rounded-full bg-emerald-100" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-32 rounded bg-emerald-100" />
                    <div className="h-4 w-24 rounded bg-slate-100" />
                    <div className="h-4 w-full rounded bg-slate-100" />
                    <div className="h-4 w-3/4 rounded bg-slate-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : allFarmers.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-emerald-200 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-700">No farmers available right now.</p>
            <p className="mt-2 text-sm text-slate-500">
              Please check back later for fresh listings.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {allFarmers.map((farmer) => (
              <div
                key={farmer.id}
                onClick={() => navigate(`/farmer/${farmer.id}`)}
                className="group cursor-pointer overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_10px_35px_-18px_rgba(5,150,105,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_-20px_rgba(5,150,105,0.45)]"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-500 p-6 sm:w-40">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.28),_transparent_45%)]" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-white/90 shadow-lg backdrop-blur">
                      <User2 size={36} className="text-emerald-700" />
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                          {farmer.farmer_name}
                        </h2>
                        <p className="mt-1 text-sm font-medium text-emerald-600">
                          Trusted Farmer
                        </p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <BadgeCheck size={14} /> Verified
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 text-sm text-slate-600">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-emerald-50 p-2 text-emerald-600 shadow-sm">
                          <MapPin size={16} />
                        </div>
                        <span>{farmer.location || "Location not provided"}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-emerald-50 p-2 text-emerald-600 shadow-sm">
                          <Phone size={16} />
                        </div>
                        <span>{farmer.phone || "Phone not provided"}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          Fresh farm products
                        </p>
                        <p className="font-semibold text-slate-700">Direct from the farm</p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/user-dashboard/farmer/${farmer.id}`);
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-700 hover:shadow-md"
                      >
                        View Store <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Farmers;