import React from 'react'
import ChapterInABookEdit from './ChapterInABookEdit';
import ConferencePaperEdit from './ConferencePaperEdit';
import ThesisFormEdit from './ThesisFormEdit'
import ResearchProjectFormEdit from './ResearchProjectFormEdit'
import CompanyTestReportFromEdit from './CompanyTestReportFromEdit'
import ArticleFormEdit from './ArticleFormEdit';
export default function DataTypeForm({ dataType }) {

  switch (dataType) {
    case "Article":
      return <ArticleFormEdit />
      break;
    case "Chapter in a Book":
      return <ChapterInABookEdit />
      break;
    case "Conference Paper":
      return <ConferencePaperEdit />
      break;
    case "Thesis":
      return <ThesisFormEdit />
      break;
    case "Research Project":
      return <ResearchProjectFormEdit />
      break;
    case "Company Test Report":
      return <CompanyTestReportFromEdit />
      break;

    default:
      break;
  }
}


