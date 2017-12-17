module.exports = (dato, root, i18n) => {

	dato.planners.forEach((planner) => {
    root.createPost(
      `src/${planner.pageSlug}.md`, "yaml", {
        frontmatter: { 
        	title: planner.introHeadline,
        	credit_rec_text: planner.recommendedCredits,
        	full_time_text: planner.fullTimeStatus,
        	start_semester: planner.planStartSemester,
        	start_year: planner.planStartYear,
        	default_grad_month: planner.defaultGraduationMonth,
        	default_grad_year: planner.defaultGraduationYear,
        	early_grad: planner.earlyGraduation,
        	late_grad: planner.lateGraduation,
        	default_current_credits: planner.defaultCurrentCredits,
        	credit_options: planner.requiredCredits.toMap(),
        	split_semesters: planner.splitSemesters,
          layout: 'default.html'
        }
      }
    );
  });

};
