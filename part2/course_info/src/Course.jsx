import Header from './Header'
import Content from './Content'
import Total from './Total'
const CourseHelper = ({course}) => {
    return (
        <div>
            <Header course = {course} />
            <Content course = {course} />
            <Total course = {course} />
        </div>
    )
}

const Course = ({courses}) => {
    return courses.map((course) => <CourseHelper key={course.id} course={course} />)
}


export default Course