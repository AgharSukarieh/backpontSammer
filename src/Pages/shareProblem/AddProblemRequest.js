import React, { useState, useEffect } from "react";
import { addProblemRequest } from "../../Service/ProblemRequestService";
import { uploadUserImage } from "../../Service/userService";
import axios from "axios";
import Swal from "sweetalert2";

const AddProblemRequest = () => {
  const [title, setTitle] = useState("");
  const [descriptionProblem, setDescriptionProblem] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [descriptionOutput, setDescriptionOutput] = useState("");
  const [authorNotes, setAuthorNotes] = useState("");
  const [difficulty, setDifficulty] = useState("سهل");
  const [memory, setMemory] = useState(128);
  const [time, setTime] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [testCases, setTestCases] = useState([
    { input: "", expectedOutput: "", isSample: true },
  ]);
  const [loading, setLoading] = useState(false);

  // ✅ جلب التاقات من الـ API
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          "http://arabcodetest.runasp.net/AllTags"
        );
        setAvailableTags(response.data);
      } catch (error) {
        console.error("حدث خطأ أثناء جلب التاقات:", error);
        Swal.fire("خطأ", "حدث خطأ أثناء تحميل التاقات.", "error");
      }
    };
    fetchTags();
  }, []);

  // ✅ تحميل الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ إضافة وإزالة Test Case
  const addTestCase = () =>
    setTestCases([
      ...testCases,
      { input: "", expectedOutput: "", isSample: true },
    ]);

  const removeTestCase = (index) => {
    if (testCases.length > 1) {
      const newCases = [...testCases];
      newCases.splice(index, 1);
      setTestCases(newCases);
    } else {
      Swal.fire(
        "تنبيه",
        "يجب أن يكون هناك Test Case واحد على الأقل.",
        "warning"
      );
    }
  };

  // ✅ إرسال الفورم
  const handleSubmit = async () => {
    if (
      !title ||
      !descriptionProblem ||
      !descriptionInput ||
      !descriptionOutput
    ) {
      Swal.fire("تنبيه", "الرجاء تعبئة كل الحقول الأساسية.", "warning");
      return;
    }
    if (tags.length === 0) {
      Swal.fire("تنبيه", "يجب اختيار Tag واحد على الأقل.", "warning");
      return;
    }
    for (let tc of testCases) {
      if (!tc.input || !tc.expectedOutput) {
        Swal.fire("تنبيه", "يجب تعبئة كل Test Case بشكل كامل.", "warning");
        return;
      }
    }
    
    setLoading(true);
    try {
      // 🔹 رفع الصورة أولاً إن وجدت
      let uploadedUrl = "";
      if (imageFile) {
        uploadedUrl = await uploadUserImage(imageFile);
      }

      console.log("localStorage.getItem(idUser) " , localStorage.getItem("idUser")) ; 

      // 🔹 بناء الـ Payload
      const payload = {
        title,
        descriptionProblem,
        imageUrl: uploadedUrl || "",
        descriptionInput,
        descriptionOutput,
        authorNotes,
        difficulty,
        memory,
        time,
        status: 1,
        createdAt: new Date().toISOString(),
        userId: localStorage.getItem("idUser"),
        requestTestCases: testCases.map((tc) => ({
          problemId: 0,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          isSample: tc.isSample,
        })),
        requestproblemTags: tags,
      };

      // 🔹 إرسال الطلب
      const data = await addProblemRequest(payload);

      Swal.fire({
        icon: "success",
        title: "تم الإرسال بنجاح!",
        text: "تم إرسال اقتراح المشكلة بنجاح 🎉",
        confirmButtonColor: "#4F46E5",
      });

      // 🔹 إعادة تعيين الحقول
      setTitle("");
      setDescriptionProblem("");
      setDescriptionInput("");
      setDescriptionOutput("");
      setAuthorNotes("");
      setTags([]);
      setTestCases([{ input: "", expectedOutput: "", isSample: true }]);
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("❌ خطأ عند الإرسال:", error);
      Swal.fire("خطأ", "حدث خطأ أثناء الإرسال.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4" style={{fontSize:"34px",fontWeight:"bold", color:"#006368"}}>
        أضف مشكلة
      </h1>

      {/* العنوان */}
      <div>
        <label className="font-semibold mb-1">العنوان</label>
        <input
          type="text"
          className="border rounded p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* وصف المشكلة */}
      <div>
        <label className="font-semibold mb-1">وصف المشكلة</label>
        <textarea
          className="border rounded p-2 w-full"
          value={descriptionProblem}
          onChange={(e) => setDescriptionProblem(e.target.value)}
        />
      </div>

      {/* المدخلات والمخرجات */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="font-semibold mb-1">وصف المدخلات</label>
          <textarea
            className="border rounded p-2 w-full"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="font-semibold mb-1">وصف المخرجات</label>
          <textarea
            className="border rounded p-2 w-full"
            value={descriptionOutput}
            onChange={(e) => setDescriptionOutput(e.target.value)}
          />
        </div>
      </div>

      {/* ملاحظات المؤلف */}
      <div>
        <label className="font-semibold mb-1">ملاحظات المؤلف</label>
        <textarea
          className="border rounded p-2 w-full"
          value={authorNotes}
          onChange={(e) => setAuthorNotes(e.target.value)}
        />
      </div>

      {/* الصعوبة والموارد */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="font-semibold mb-1">الصعوبة</label>
          <select
            className="border rounded p-2 w-full"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="سهل">سهل</option>
            <option value="متوسط">متوسط</option>
            <option value="صعب">صعب</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="font-semibold mb-1">Memory (MB)</label>
          <input
            type="number"
            className="border rounded p-2 w-full"
            value={memory}
            onChange={(e) => setMemory(Number(e.target.value))}
          />
        </div>
        <div className="flex-1">
          <label className="font-semibold mb-1">Time (s)</label>
          <input
            type="number"
            className="border rounded p-2 w-full"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </div>
      </div>

      {/* الصورة */}
      <div>
        <label className="font-semibold mb-1">صورة المشكلة</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img
          alt="img"
            src={imagePreview}
            className="mt-2 rounded-lg max-h-48 object-contain"
          />
        )}
      </div>

      {/* التاقات */}
      <div>
        <label className="font-semibold mb-1">Tags</label>
        <select
          multiple
          className="border rounded p-2 w-full"
          value={tags}
          onChange={(e) => {
            const selectedIds = Array.from(e.target.selectedOptions).map((o) =>
              parseInt(o.value)
            );
            setTags(selectedIds);
          }}
        >
          {availableTags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.tagName}
            </option>
          ))}
        </select>
      </div>

      {/* Test Cases */}
      <div>
        <h2 className="font-bold text-lg mt-4">Test Cases</h2>
        {testCases.map((tc, index) => (
          <div key={index} className="border rounded p-4 my-2">
            <label className="font-semibold">Input</label>
            <textarea
              className="border rounded p-2 w-full"
              value={tc.input}
              onChange={(e) => {
                const newCases = [...testCases];
                newCases[index].input = e.target.value;
                setTestCases(newCases);
              }}
            />
            <label className="font-semibold">Expected Output</label>
            <textarea
              className="border rounded p-2 w-full"
              value={tc.expectedOutput}
              onChange={(e) => {
                const newCases = [...testCases];
                newCases[index].expectedOutput = e.target.value;
                setTestCases(newCases);
              }}
            />
            <div className="flex items-center gap-4 mt-2">
              <label>
                <input
                  type="checkbox"
                  checked={tc.isSample}
                  onChange={(e) => {
                    const newCases = [...testCases];
                    newCases[index].isSample = e.target.checked;
                    setTestCases(newCases);
                  }}
                />{" "}
                Sample Test
              </label>
              {testCases.length > 1 && (
                <button
                style={{backgroundColor:"#f13405ff",color:"white",padding:"8px",borderRadius:"6px",boxShadow: "0 4px 6px -2px #f13405ff" , fontWeight:"bold",letterSpacing:"6px"}}
                  className="ml-auto text-red-600"
                  onClick={() => removeTestCase(index)}
                >
                  حذف
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          className="bg-green-600 text-white py-2 px-4 rounded mt-2"
          onClick={addTestCase}
        >
          إضافة Test Case
        </button>
      </div>

      {/* زر الإرسال */}
      <button
      style={{fontSize:"20px", fontWeight:"bold", backgroundColor:"#17A0A4"}}
        disabled={loading}
        className={`w-full py-3 mt-4 text-white rounded-xl ${
          loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
        onClick={handleSubmit}
      >
        {loading ? "جاري الإرسال..." : "إرسال الاقتراح"}
      </button>
    </div>
  );
};

export default AddProblemRequest;