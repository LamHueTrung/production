"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Error500 = ({ message, error }) => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("style", { children: `
        /* Tổng thể */
        .error-500-container {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: radial-gradient(circle at top, #f8f9fa 0%, #e9ecef 100%);
              font-family: 'Poppins', sans-serif;
              color: #212529;
              text-align: center;
              padding: 1.5rem;
            }
            
            /* Card trung tâm */
            .error-card {
              background: #fff;
              padding: 3rem 2rem;
              border-radius: 24px;
              box-shadow: 0 10px 35px rgba(0,0,0,0.08);
              max-width: 600px;
              width: 100%;
              animation: fadeInUp 0.7s ease;
            }
            
            /* Icon cảnh báo */
            .error-icon {
              font-size: 5rem;
              color: #dc3545;
              margin-bottom: 1.2rem;
            }
            
            /* Tiêu đề */
            .error-code {
              font-size: 5rem;
              font-weight: 800;
              color: #dc3545;
              margin: 0;
            }
            
            .error-title {
              font-size: 1.75rem;
              font-weight: 600;
              margin-bottom: 1rem;
            }
            
            /* Thông báo */
            .error-message {
              font-size: 1rem;
              color: #6c757d;
              margin-bottom: 1.5rem;
            }
            
            /* Chi tiết lỗi (cho dev) */
            .error-details {
              text-align: left;
              background: #212529;
              color: #f8f9fa;
              padding: 1rem;
              border-radius: 12px;
              margin-bottom: 1.5rem;
              font-size: 0.85rem;
              overflow: auto;
              max-height: 200px;
            }
            
            .error-details pre {
              white-space: pre-wrap;
              word-wrap: break-word;
              margin: 0;
              font-family: 'Courier New', monospace;
            }
            
            /* Mô tả phụ */
            .error-subtext {
              font-size: 0.95rem;
              color: #495057;
              margin-bottom: 2rem;
            }
            
            /* Buttons */
            .error-actions {
              display: flex;
              justify-content: center;
              gap: 1rem;
              flex-wrap: wrap;
            }
            
            .btn-main {
              background-color: #dc3545;
              color: #fff;
              border: none;
              padding: 0.8rem 1.8rem;
              border-radius: 12px;
              font-weight: 600;
              text-decoration: none;
              transition: all 0.3s ease;
            }
            
            .btn-main:hover {
              background-color: #bb2d3b;
            }
            
            .btn-outline {
              background-color: transparent;
              border: 2px solid #6c757d;
              color: #6c757d;
              padding: 0.8rem 1.8rem;
              border-radius: 12px;
              font-weight: 600;
              transition: all 0.3s ease;
            }
            
            .btn-outline:hover {
              background-color: #6c757d;
              color: #fff;
            }
            
            /* Animation */
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }    
    ` }), (0, jsx_runtime_1.jsx)("div", { className: "error-500-container", children: (0, jsx_runtime_1.jsxs)("div", { className: "error-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "error-icon animate__animated animate__pulse animate__infinite", children: (0, jsx_runtime_1.jsx)("i", { className: "bi bi-exclamation-triangle-fill" }) }), (0, jsx_runtime_1.jsx)("h1", { className: "error-code", children: "500" }), (0, jsx_runtime_1.jsx)("h2", { className: "error-title", children: "L\u1ED7i m\u00E1y ch\u1EE7 n\u1ED9i b\u1ED9" }), (0, jsx_runtime_1.jsx)("p", { className: "error-message", children: message || "Đã xảy ra lỗi không mong muốn." }), error && ((0, jsx_runtime_1.jsxs)("div", { className: "error-details", children: [(0, jsx_runtime_1.jsxs)("h5", { children: [(0, jsx_runtime_1.jsx)("i", { className: "bi bi-code-slash me-2" }), "Chi ti\u1EBFt k\u1EF9 thu\u1EADt:"] }), (0, jsx_runtime_1.jsx)("pre", { children: error })] })), (0, jsx_runtime_1.jsx)("p", { className: "error-subtext", children: "C\u00F3 v\u1EBB nh\u01B0 m\u00E1y ch\u1EE7 \u0111ang \u201Cm\u1EC7t m\u1ECFi\u201D m\u1ED9t ch\u00FAt \uD83E\uDD72 \u0110\u1EEBng lo, ch\u00FAng t\u00F4i \u0111ang x\u1EED l\u00FD. Trong l\u00FAc ch\u1EDD, b\u1EA1n c\u00F3 th\u1EC3:" }), (0, jsx_runtime_1.jsxs)("div", { className: "error-actions", children: [(0, jsx_runtime_1.jsxs)("a", { href: "/", className: "btn-main", children: [(0, jsx_runtime_1.jsx)("i", { className: "bi bi-house-door me-2" }), "Trang ch\u1EE7"] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                        if (typeof window !== "undefined") {
                                            window.location.reload();
                                        }
                                    }, className: "btn-outline", children: "T\u1EA3i l\u1EA1i trang" })] })] }) })] }));
};
exports.default = Error500;
//# sourceMappingURL=Error500.js.map