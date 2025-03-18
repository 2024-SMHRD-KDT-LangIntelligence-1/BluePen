// PDF 파일 업로드 처리
document.getElementById("resumeFile").addEventListener("change", function(event) {
    let file = event.target.files[0];
    let fileNameSpan = document.getElementById("file-name");

    if (file) {
        if (file.size > 50 * 1024 * 1024) {
            alert("파일 크기가 50MB를 초과하였습니다.");
            event.target.value = ""; 
            fileNameSpan.textContent = "파일을 선택해주세요 (최대 5MB)";
        } else {
            fileNameSpan.textContent = file.name;
        }
    }
});

// 학력사항 
let educationCount = 1;

function addEducation() {
    educationCount++;
    let container = document.getElementById("education-container");
    let newField = document.createElement("div");
    newField.classList.add("education-box");
    newField.innerHTML = `
        <div class="education-header">
            <span>학력 ${educationCount}</span>
            <button class="remove-btn" onclick="removeEducation(this)">삭제</button>
        </div>
        <div class="education-group">
            <div style="width: 50%;">
                <label>학교 (선택)</label>
                <input type="text" name="school[]" placeholder="학교명을 입력하세요">
            </div>
            <div style="width: 50%;">
                <label>전공 (선택)</label>
                <input type="text" name="major[]" placeholder="전공을 입력하세요">
            </div>
        </div>
        <div class="education-group">
            <div style="width: 50%;">
                <label>재학기간 (선택)</label>
                <input type="text" name="study_period[]" placeholder="YYYY/MM - YYYY/MM">
            </div>
            <div style="width: 50%;">
                <label>구분 (선택)</label>
                <select name="status[]">
                    <option value="">현 상태를 선택해 주세요</option>
                    <option value="재학 중">재학 중</option>
                    <option value="졸업">졸업</option>
                    <option value="중퇴">중퇴</option>
                </select>
            </div>
        </div>
        <div class="education-group">
            <div class="gpa-group">
                <label>학점 (선택)</label>
                <input type="text" name="gpa[]" placeholder="학점을 입력하세요 (예: 4.0)">
            </div>
        </div>`;
    container.appendChild(newField);
}

function removeEducation(element) {
    element.parentElement.parentElement.remove();
    educationCount--;
    updateEducationNumbers();
}

function updateEducationNumbers() {
    let educationBoxes = document.querySelectorAll(".education-box .education-header span");
    educationBoxes.forEach((span, index) => {
        span.textContent = `학력 ${index + 1}`;
    });
}
function showSection(section) {
    document.getElementById("section1").classList.remove("visible");
    document.getElementById("section2").classList.remove("visible");
    document.getElementById("step1").classList.remove("active");
    document.getElementById("step2").classList.remove("active");
    document.getElementById("step1").classList.add("inactive");
    document.getElementById("step2").classList.add("inactive");
    
    if (section === 1) {
        document.getElementById("section1").classList.add("visible");
        document.getElementById("step1").classList.add("active");
    } else {
        document.getElementById("section2").classList.add("visible");
        document.getElementById("step2").classList.add("active");
    }
}

function submitForm() {
    alert("이력서가 제출되었습니다!");
}