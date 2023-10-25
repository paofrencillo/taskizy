export default function MemberLabel({ memberFullName }) {
  return (
    <div className="flex justify-start items-center gap-2 group">
      <div className="w-8 h-8 rounded-full">
        <img
          src="https://media.istockphoto.com/id/1438185814/photo/college-student-asian-man-and-studying-on-laptop-at-campus-research-and-education-test-exam.jpg?s=1024x1024&w=is&k=20&c=w7Ju_4MNb5C3UGwiF-djAWoPdLbbBrppHjX5-kCboag="
          alt="user-img"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="text-sm">{memberFullName}</div>
    </div>
  );
}
