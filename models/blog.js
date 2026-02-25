import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true
    },
    tags: [String],
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

blogSchema.pre("save", async function () {
  if (!this.isModified("title")) {
    return next();
  }

  let baseSlug = slugify(this.title, {
    lower: true,
    strict: true
  });

  let slug = baseSlug;
  let counter = 1;

  const Blog = mongoose.model("Blog");

  while (await Blog.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
});

export default mongoose.model("Blog", blogSchema);