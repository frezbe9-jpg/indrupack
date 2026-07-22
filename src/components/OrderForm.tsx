import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Input, Textarea, Select, Button } from "./ui-core";
import { cn } from "../utils/cn";

type FormData = {
  name: string;
  phone: string;
  email: string;
  length: string;
  width: string;
  height: string;
  quantity: string;
  cardboardGrade: string;
  fefcoCode: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  phone: "",
  email: "",
  length: "",
  width: "",
  height: "",
  quantity: "",
  cardboardGrade: "",
  fefcoCode: "",
  message: "",
};

type Status = "idle" | "loading" | "success" | "error";

export default function OrderForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Введите ваше имя";
    if (!form.phone.trim()) errs.phone = "Введите номер телефона";
    else if (!/^\+?[\d\s\-\(\)]{7,}$/.test(form.phone)) errs.phone = "Некорректный номер";
    if (!form.quantity.trim()) errs.quantity = "Укажите тираж";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-green-800/50 bg-green-950/30 p-12 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-green-600/20 border border-green-600/30 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
          Заявка принята!
        </h3>
        <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-md mb-8">
          Наш менеджер свяжется с вами в течение рабочего дня для уточнения деталей и расчёта стоимости.
        </p>
        <Button
          onClick={() => { setStatus("idle"); setForm(initialForm); }}
          variant="outline"
        >
          Отправить ещё одну заявку
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Info */}
      <div>
        <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">
          Контактные данные
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Имя *
            </label>
            <Input
              name="name"
              placeholder="Иван Иванов"
              value={form.name}
              onChange={handleChange}
              className={cn(errors.name && "border-red-500/50 focus:ring-red-500/50")}
            />
            {errors.name && (
              <p className="flex items-center gap-1.5 text-red-400 text-xs font-medium mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Телефон *
            </label>
            <Input
              name="phone"
              placeholder="+7 (900) 123-45-67"
              value={form.phone}
              onChange={handleChange}
              className={cn(errors.phone && "border-red-500/50 focus:ring-red-500/50")}
            />
            {errors.phone && (
              <p className="flex items-center gap-1.5 text-red-400 text-xs font-medium mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Email (необязательно)
          </label>
          <Input
            name="email"
            type="email"
            placeholder="mail@company.ru"
            value={form.email}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Dimensions */}
      <div>
        <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">
          Параметры упаковки
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Длина, мм</label>
            <Input name="length" placeholder="300" type="number" value={form.length} onChange={handleChange} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Ширина, мм</label>
            <Input name="width" placeholder="200" type="number" value={form.width} onChange={handleChange} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Высота, мм</label>
            <Input name="height" placeholder="150" type="number" value={form.height} onChange={handleChange} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Тираж (шт.) *
            </label>
            <Input
              name="quantity"
              placeholder="1 000"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              className={cn(errors.quantity && "border-red-500/50 focus:ring-red-500/50")}
            />
            {errors.quantity && (
              <p className="flex items-center gap-1.5 text-red-400 text-xs font-medium mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.quantity}
              </p>
            )}
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Марка картона
            </label>
            <Select name="cardboardGrade" value={form.cardboardGrade} onChange={handleChange}>
              <option value="">Не знаю / на усмотрение</option>
              <option value="Т-21">Т-21 (трёхслойный)</option>
              <option value="Т-23">Т-23 (трёхслойный)</option>
              <option value="Т-24">Т-24 (трёхслойный усиленный)</option>
              <option value="П-32">П-32 (пятислойный)</option>
              <option value="П-33">П-33 (пятислойный)</option>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Код FEFCO (если известен)
          </label>
          <Select name="fefcoCode" value={form.fefcoCode} onChange={handleChange}>
            <option value="">Выбрать из каталога</option>
            <option value="0201">FEFCO 0201 — Стандартный</option>
            <option value="0203">FEFCO 0203 — С перекрытием</option>
            <option value="0300">FEFCO 0300 — Телескоп</option>
            <option value="0421">FEFCO 0421 — С замком</option>
            <option value="0427">FEFCO 0427 — Самосборный</option>
            <option value="0701">FEFCO 0701 — Авто-дно</option>
          </Select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
          Дополнительные пожелания
        </label>
        <Textarea
          name="message"
          placeholder="Особые требования к прочности, печать, покрытие, цвет..."
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="w-full shadow-2xl shadow-orange-600/30 hover:-translate-y-1 transition-transform"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            Отправляем...
          </>
        ) : (
          <>
            Отправить заявку
            <Send className="ml-3 h-5 w-5" />
          </>
        )}
      </Button>

      <p className="text-center text-gray-500 text-xs font-medium">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
        Ответим в течение одного рабочего дня.
      </p>
    </form>
  );
}
