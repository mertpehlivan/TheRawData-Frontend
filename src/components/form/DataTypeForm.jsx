import React from 'react'
import PublicationTypeForm from './PublicationTypeForm'
import { useSelector } from 'react-redux'
import ArticleForm from './ArticleForm'
import ChapterInABook from './ChapterInABook'
import ConferencePaper from './ConferencePaper'
import ThesisForm from './ThesisForm'
import ResearchProjectForm from './ResearchProjectForm'
import CompanyTestReportFrom from './CompanyTestReportFrom'
import RawDataForm from './RawDataForm'
import UploadForm from './UploadForm'

export default function DataTypeForm() {
  const dataType = useSelector((state)=>state.newDataType.value)
  const pageNumber = useSelector((state)=>state.pageNumber.value)
  const selectForm = ()=>{
    switch (dataType) {
      case "Article":
        return <ArticleForm/>
        break;
      case "Chapter in a Book":
        return <ChapterInABook/>
        break;
      case "Conference Paper":
        return <ConferencePaper/>
        break;
      case "Thesis":
        return <ThesisForm/>
        break;
      case "Research Project":
        return <ResearchProjectForm/>
        break;
      case "Company Test Report":
        return <CompanyTestReportFrom/>
        break;
      
      default:
        break;
    }
  }
  switch (pageNumber) {
    case 0:
      return <PublicationTypeForm/>
      break;
    case 1:
      return selectForm()
      break;
    case 2:
      return <RawDataForm/>
      break;
    default:
      return <UploadForm/>
      break;
  }
}
