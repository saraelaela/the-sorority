type Props = {
  params: Promise<{
    firstName: string;
  }>;
};

export default async function UserProfilePage(props: Props) {
  const { firstName } = await props.params;

  return (
    <>
      <div>
        <h2>{firstName} page</h2>
      </div>
    </>
  );
}
