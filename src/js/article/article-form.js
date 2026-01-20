/**
 * Generates the HTML for create/ edit article form.
 *
 * @returns {string} HTML string containing the article form.
 */
export function articleFormHTML() {
  return `
<div class="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
  <h2 id="form-title" class="text-2xl text-center font-bold text-gray-900 mb-4">Create Article</h2>
  <div id="message-container"></div>
  <form id="article-form" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Article Title<span class="text-red-700">*</span></label>
      <input type="text" name="title" minlength="5" maxlength="100" required class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="Enter article title" />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Category<span class="text-red-700">*</span></label>
      <select title="category" name="category" required class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500">
        <option value="">Select a category</option>
        <option value="Technology">Technology</option>
        <option value="Business">Business</option>
        <option value="Sports">Sports</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Politics">Politics</option>
        <option value="Health">Health</option>
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Article Body<span class="text-red-700">*</span></label>
      <textarea name="body" required rows="6" minlength="20" class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500" placeholder="Write your article content here..."></textarea>
    </div>
    <div class="flex gap-4 flex-col sm:flex-row">
      <button type="button" id="cancel-form-btn" class="cursor-pointer flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 font-medium transition-colors">Cancel</button>
      <button type="submit" class="cursor-pointer flex-1 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 font-medium transition-colors">Publish Article</button>
    </div>

    <div id="delete-container" class="w-full flex justify-center mt-10">
           <button type="button" id="delete-btn" class="cursor-pointer w-40 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-gray-600 font-medium transition-colors">Delete Article</button>
    </div>
  </form>
</div>
`;
}
