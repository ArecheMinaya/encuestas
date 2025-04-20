import { useState } from "react";
import { motion } from "framer-motion";

interface Question {
  id: number;
  text: string;
  type: "multiple" | "scale";
  options?: string[];
}

export default function SurveyFormCreator() {
  const [questions, setQuestions] = useState<Question[]>([{ id: Date.now(), text: "", type: "multiple", options: [""] }]);

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), text: "", type: "multiple", options: [""] }]);
  };

  const updateQuestion = (id: number, key: keyof Question, value: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [key]: value } : q))
    );
  };

  const updateOption = (id: number, index: number, value: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id && q.options) {
          const updatedOptions = [...q.options];
          updatedOptions[index] = value;
          return { ...q, options: updatedOptions };
        }
        return q;
      })
    );
  };

  const addOption = (id: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === id && q.options ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Creador de Encuestas</h1>

        {questions.map((q, idx) => (
          <motion.div
            key={q.id}
            layout
            className="mb-4 p-4 rounded-xl border border-gray-200 bg-gray-50 shadow-sm"
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pregunta {idx + 1}:
            </label>
            <input
              type="text"
              value={q.text}
              onChange={(e) => updateQuestion(q.id, "text", e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Escribe tu pregunta..."
            />
            <select
              value={q.type}
              onChange={(e) => updateQuestion(q.id, "type", e.target.value as Question["type"])}
              className="w-full p-2 border rounded-lg"
            >
              <option value="multiple">Opción múltiple</option>
              <option value="scale">Escala (1 a 5)</option>
            </select>

            {q.type === "multiple" && q.options?.map((opt, i) => (
              <input
                key={i}
                type="text"
                value={opt}
                onChange={(e) => updateOption(q.id, i, e.target.value)}
                className="w-full p-2 border rounded-lg my-1"
                placeholder={`Opción ${i + 1}`}
              />
            ))}

            {q.type === "multiple" && (
              <button
                onClick={() => addOption(q.id)}
                className="text-blue-500 text-sm hover:underline mb-2"
              >
                + Añadir opción
              </button>
            )}

            {q.type === "scale" && (
              <p className="text-sm text-gray-600 mt-2">Escala de 1 (Muy en desacuerdo) a 5 (Muy de acuerdo)</p>
            )}

            <button
              onClick={() => removeQuestion(q.id)}
              className="mt-2 text-red-500 text-sm hover:underline"
            >
              Eliminar pregunta
            </button>
          </motion.div>
        ))}

        <div className="text-center mt-6">
          <button
            onClick={addQuestion}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-2xl shadow"
          >
            + Añadir pregunta
          </button>
        </div>
      </motion.div>
    </div>
  );
}
