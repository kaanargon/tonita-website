import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

function Card({ className = "", children }) {
  return <div className={`border bg-white ${className}`}>{children}</div>;
}

function Button({ className = "", children, ...props }) {
  return (
    <button className={`inline-flex items-center justify-center font-semibold ${className}`} {...props}>
      {children}
    </button>
  );
}

const RESTAURANT = {
  name: "Tonita Kitchen LLC",
  tagline: "Authentic Mexican food truck in Carrboro",
  description:
    "Fresh tacos, tortas, gorditas, quesadillas, burgers, enchiladas, and more made with bold Mexican flavors.",
  rating: "4.9",
  reviews: "30 reviews",
  priceRange: "$10–20 per person",
  address: "501 W Main St, Carrboro, NC 27510",
  phone: "(984) 227-4221",
  instagram: "@tonitakitchen2024",
  features: ["Drive-through", "Order ahead", "Latino-owned", "LGBTQ+ friendly"],
  hours: {
    Monday: "3–8 PM",
    Tuesday: "3–8 PM",
    Wednesday: "3:30–8 PM",
    Thursday: "3:30–9 PM",
    Friday: "Closed",
    Saturday: "Closed",
    Sunday: "Closed",
  },
  menu: [
    { category: "Tacos & Mexican Classics", items: [
      { name: "3 Piece Tacos", price: "$12", desc: "Cilantro and red onions, with grilled onions, peppers, and limes on the side." },
      { name: "Torta", price: "$13", desc: "Beans, mayo, lettuce, tomatoes, avocado, and cheese." },
      { name: "Cubanas", price: "$16", desc: "Loaded Mexican sandwich." },
      { name: "Gordita", price: "$6", desc: "Beans, lettuce, sour cream, and cheese." },
      { name: "Sope", price: "$6", desc: "Beans, lettuce, sour cream, and cheese." },
      { name: "Quesadilla", price: "$12", desc: "Classic quesadilla." },
      { name: "Burrito", price: "$14", desc: "Fresh Mexican-style burrito." },
    ]},
    { category: "Burgers & Sides", items: [
      { name: "Papas", price: "$4", desc: "Fries." },
      { name: "Hot Dog", price: "$5", desc: "Simple and quick." },
      { name: "Hamburguesa Classic", price: "$13", desc: "Served with fries." },
      { name: "The Mexican Burger", price: "$15", desc: "Served with fries." },
      { name: "The Cali Burger", price: "$15", desc: "Served with fries." },
    ]},
    { category: "Enchiladas", items: [
      { name: "Chicken Enchiladas", price: "$15", desc: "Comes with 5 enchiladas." },
      { name: "Cheese Enchiladas", price: "$15", desc: "Comes with 5 enchiladas." },
    ]},
  ],
};

const quickReplies = [
  "What are your hours?",
  "Where are you located?",
  "What tacos do you have?",
  "Can I order ahead?",
  "Are you open Friday?",
];

function getBotReply(input) {
  const text = input.toLowerCase();

  if (text.includes("hour") || text.includes("open") || text.includes("closed") || text.includes("time") || text.includes("friday") || text.includes("saturday") || text.includes("sunday")) {
    return "Our hours are Monday 3–8 PM, Tuesday 3–8 PM, Wednesday 3:30–8 PM, Thursday 3:30–9 PM, and we are closed Friday through Sunday.";
  }

  if (text.includes("where") || text.includes("location") || text.includes("address") || text.includes("main")) {
    return `We are located at ${RESTAURANT.address}.`;
  }

  if (text.includes("order") || text.includes("ahead") || text.includes("phone") || text.includes("call")) {
    return `You can order ahead by calling ${RESTAURANT.phone}.`;
  }

  if (text.includes("taco") || text.includes("menu") || text.includes("price") || text.includes("cost") || text.includes("food")) {
    return "Popular menu items include 3 piece tacos for $12, tortas for $13, quesadillas for $12, burritos for $14, burgers from $13–$15, and enchiladas for $15.";
  }

  if (text.includes("instagram") || text.includes("social")) {
    return `You can follow us on Instagram at ${RESTAURANT.instagram}.`;
  }

  if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
    return `Hey! I’m the ${RESTAURANT.name} assistant. I can help with hours, location, menu, and order-ahead info.`;
  }

  return `I’m not totally sure about that. You can call ${RESTAURANT.phone} and the team can help you directly.`;
}

function ChatBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? "bg-red-600 text-white" : "bg-white border border-orange-200 text-zinc-900"}`}>
        {text}
      </div>
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState([
    { role: "bot", text: `Hola! I’m the ${RESTAURANT.name} assistant. Ask me about hours, location, menu, or ordering ahead.` },
  ]);
  const [input, setInput] = useState("");

  useMemo(() => RESTAURANT.menu.flatMap((section) => section.items), []);

  function sendMessage(customText) {
    const messageText = (customText ?? input).trim();
    if (!messageText) return;
    setMessages((prev) => [...prev, { role: "user", text: messageText }, { role: "bot", text: getBotReply(messageText) }]);
    setInput("");
  }

  return (
    <div className="min-h-screen bg-[#fff6dd] text-zinc-950">
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-300 via-orange-100 to-red-100 px-5 py-12">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="mb-3 inline-block rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-red-700">⭐ {RESTAURANT.rating} • {RESTAURANT.reviews} • {RESTAURANT.priceRange}</p>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">{RESTAURANT.name}</h1>
            <p className="mt-4 text-2xl font-bold text-zinc-800">{RESTAURANT.tagline}</p>
            <p className="mt-4 max-w-xl text-lg text-zinc-700">{RESTAURANT.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${RESTAURANT.phone}`} className="rounded-full bg-red-600 px-6 py-3 font-bold text-white shadow-sm hover:bg-red-700">Order Ahead</a>
              <a href="#menu" className="rounded-full bg-white px-6 py-3 font-bold text-zinc-900 shadow-sm hover:bg-orange-50">View Menu</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className="rounded-[2rem] bg-white p-5 shadow-xl">
            <div className="aspect-[4/3] rounded-[1.5rem] bg-gradient-to-br from-orange-200 to-yellow-100 p-6">
              <div className="flex h-full flex-col justify-between rounded-[1.25rem] border-4 border-dashed border-red-300 bg-white/70 p-6 text-center">
                <div>
                  <p className="text-6xl">🌮</p>
                  <h2 className="mt-4 text-3xl font-black">Mexican Food Truck</h2>
                  <p className="mt-2 text-zinc-700">Tacos • Tortas • Gorditas • Burgers • Enchiladas</p>
                </div>
                <p className="rounded-full bg-yellow-300 px-4 py-3 font-black">Call {RESTAURANT.phone}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {RESTAURANT.features.map((feature) => (
            <Card key={feature} className="rounded-2xl border-orange-200 p-5 text-center shadow-sm">
              <p className="text-2xl">✅</p>
              <p className="mt-2 font-bold">{feature}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="menu" className="px-5 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-black">Menu</h2>
            <p className="mt-2 text-zinc-700">Simple, fresh, and made to order.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {RESTAURANT.menu.map((section) => (
              <Card key={section.category} className="rounded-3xl border-orange-200 p-6 shadow-sm">
                <h3 className="mb-4 text-2xl font-black text-red-700">{section.category}</h3>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.name} className="border-b border-orange-100 pb-3 last:border-b-0">
                      <div className="flex justify-between gap-3">
                        <p className="font-bold">{item.name}</p>
                        <p className="font-black text-red-600">{item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-zinc-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-orange-200 p-6 shadow-sm">
            <h2 className="text-3xl font-black">Hours & Location</h2>
            <p className="mt-3 text-lg">📍 {RESTAURANT.address}</p>
            <p className="mt-2 text-lg">📞 {RESTAURANT.phone}</p>
            <p className="mt-2 text-lg">📸 {RESTAURANT.instagram}</p>
            <div className="mt-5 grid gap-2">
              {Object.entries(RESTAURANT.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between rounded-xl bg-orange-50 px-4 py-3">
                  <span className="font-bold">{day}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="flex min-h-[520px] flex-col rounded-3xl border-orange-200 shadow-sm">
            <div className="border-b border-orange-100 p-5">
              <h2 className="text-2xl font-black">Ask Tonita Assistant</h2>
              <p className="text-sm text-zinc-600">Try asking about hours, menu, location, or ordering ahead.</p>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto bg-orange-50/70 p-5">
              {messages.map((message, index) => <ChatBubble key={index} role={message.role} text={message.text} />)}
            </div>
            <div className="border-t border-orange-100 bg-white p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button key={reply} onClick={() => sendMessage(reply)} className="rounded-full border border-orange-200 px-3 py-1.5 text-xs font-semibold hover:bg-orange-50">
                    {reply}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 rounded-xl border border-orange-200 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="Ask a question..."
                />
                <Button onClick={() => sendMessage()} className="rounded-xl bg-red-600 px-5 text-white hover:bg-red-700">Send</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="bg-zinc-950 px-5 py-8 text-center text-white">
        <p className="text-xl font-black">{RESTAURANT.name}</p>
        <p className="mt-2 text-zinc-300">{RESTAURANT.address}</p>
        <p className="mt-1 text-zinc-300">Order ahead: {RESTAURANT.phone}</p>
      </footer>
    </div>
  );
}
