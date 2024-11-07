type Props = {
  params: Promise<{
    firstName: string;
  }>;
};

export default async function UserProfilePage(props: Props) {
  const { firstName } = await props.params;
  console.log('Resolved params:', await props.params);
  console.log('test', firstName);
  return (
    <>
      <div>
        <h2>{firstName} page</h2>
      </div>
    </>
  );
}
