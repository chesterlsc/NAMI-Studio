document.documentElement.classList.add("js-enabled");

const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const closeMenu = () => {
  if (!header || !menuToggle) {
    return;
  }

  header.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  body.classList.remove("menu-open");
};

if (menuToggle && header && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    body.classList.toggle("menu-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });
}

const showAllReveals = () => {
  revealItems.forEach((item) => item.classList.add("is-visible"));
};

if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  showAllReveals();
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

reducedMotion.addEventListener("change", (event) => {
  if (event.matches) {
    showAllReveals();
  }
});

const growthAssessmentForm = document.querySelector("[data-growth-assessment-form]");

if (growthAssessmentForm) {
  const wizard = growthAssessmentForm.querySelector(".growth-wizard");
  const message = growthAssessmentForm.querySelector("[data-assessment-message]");
  const steps = [...growthAssessmentForm.querySelectorAll(".assessment-step")];
  const backButton = growthAssessmentForm.querySelector("[data-wizard-back]");
  const nextButton = growthAssessmentForm.querySelector("[data-wizard-next]");
  const submitButton = growthAssessmentForm.querySelector(".assessment-submit");
  const submitMicrocopy = growthAssessmentForm.querySelector("[data-submit-microcopy]");
  const progressCurrent = growthAssessmentForm.querySelector("[data-progress-current]");
  const progressTotal = growthAssessmentForm.querySelector("[data-progress-total]");
  const progressBar = growthAssessmentForm.querySelector("[data-progress-bar]");

  if (
    wizard &&
    message &&
    steps.length &&
    backButton &&
    nextButton &&
    submitButton &&
    progressCurrent &&
    progressTotal &&
    progressBar
  ) {
    let currentStep = 0;

    const formatStep = (index) => String(index + 1).padStart(2, "0");

    const setMessage = (text, state = "") => {
      message.textContent = text;

      if (state) {
        message.dataset.state = state;
      } else {
        delete message.dataset.state;
      }
    };

    const setStepError = (step, text) => {
      const error = step.querySelector(".assessment-step-error");
      step.dataset.invalid = text ? "true" : "false";

      if (error) {
        error.textContent = text;
      }
    };

    const getStepControls = (step) =>
      [...step.querySelectorAll("input, textarea, select")].filter(
        (control) =>
          control.name &&
          control.type !== "hidden" &&
          control.name !== "_gotcha" &&
          !control.disabled
      );

    const validateStep = (step, shouldFocus = true) => {
      const controls = getStepControls(step);
      const radioControls = controls.filter((control) => control.type === "radio");

      if (radioControls.length) {
        const checked = radioControls.some((control) => control.checked);

        if (!checked) {
          setStepError(step, "Please choose one option before continuing.");
          if (shouldFocus) {
            radioControls[0].focus();
          }
          return false;
        }

        setStepError(step, "");
        return true;
      }

      const field = controls[0];
      const value = field?.value.trim();

      if (!value) {
        setStepError(step, "Please answer this before continuing.");
        if (shouldFocus) {
          field?.focus();
        }
        return false;
      }

      if (field.type === "email" && !field.validity.valid) {
        setStepError(step, "Please enter a valid email.");
        if (shouldFocus) {
          field.focus();
        }
        return false;
      }

      setStepError(step, "");
      return true;
    };

    const focusActiveStep = () => {
      const target = steps[currentStep].querySelector("input, textarea, select");
      target?.focus({ preventScroll: true });
    };

    const updateStep = (index, shouldFocus = true) => {
      currentStep = Math.max(0, Math.min(index, steps.length - 1));

      steps.forEach((step, stepIndex) => {
        const isActive = stepIndex === currentStep;
        step.hidden = !isActive;
        step.classList.toggle("is-active", isActive);
      });

      const isFinal = currentStep === steps.length - 1;
      const progress = ((currentStep + 1) / steps.length) * 100;

      progressCurrent.textContent = formatStep(currentStep);
      progressTotal.textContent = String(steps.length).padStart(2, "0");
      progressBar.style.width = `${progress}%`;
      backButton.hidden = currentStep === 0;
      nextButton.hidden = isFinal;
      submitButton.hidden = !isFinal;

      if (submitMicrocopy) {
        submitMicrocopy.hidden = !isFinal;
      }

      wizard.dataset.currentStep = String(currentStep + 1);
      setMessage("");

      if (shouldFocus) {
        focusActiveStep();
      }
    };

    growthAssessmentForm.addEventListener("input", (event) => {
      const step = event.target.closest(".assessment-step");

      if (step) {
        setStepError(step, "");
      }
    });

    growthAssessmentForm.addEventListener("change", (event) => {
      const step = event.target.closest(".assessment-step");

      if (step) {
        setStepError(step, "");
      }
    });

    backButton.addEventListener("click", () => {
      updateStep(currentStep - 1);
    });

    nextButton.addEventListener("click", () => {
      const activeStep = steps[currentStep];

      if (!validateStep(activeStep)) {
        return;
      }

      updateStep(currentStep + 1);
    });

    growthAssessmentForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      for (let index = 0; index < steps.length; index += 1) {
        if (!validateStep(steps[index], false)) {
          updateStep(index);
          validateStep(steps[index]);
          return;
        }
      }

      submitButton.disabled = true;
      submitButton.textContent = submitButton.dataset.loadingText || "Sending...";
      setMessage("");

      try {
        const response = await fetch(growthAssessmentForm.action, {
          method: "POST",
          body: new FormData(growthAssessmentForm),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        growthAssessmentForm.reset();
        steps.forEach((step) => setStepError(step, ""));
        updateStep(0, false);
        setMessage(
          "Growth assessment received. Thank you. We\u2019ll review it carefully and follow up if there\u2019s a strong fit.",
          "success"
        );
      } catch (error) {
        setMessage("Something went wrong. Please try again.", "error");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.defaultText || "LET\u2019S DO THIS \u2192";
      }
    });

    updateStep(0, false);
  }
}
