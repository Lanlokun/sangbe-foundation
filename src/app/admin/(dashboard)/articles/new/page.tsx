
import ArticleEditor from "@/components/admin/articles/ArticleEditor";
import { requireCMSUser } from "@/lib/admin/auth";

export default async function NewArticlePage() {
  const user = await requireCMSUser();

  return (
    <ArticleEditor
      canPublish={["super_admin", "admin", "editor"].includes(user.role)}
    />
  );
}
